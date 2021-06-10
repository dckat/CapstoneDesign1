import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'ws';
import { DroneService } from './drone.service';
import { DroneLogEntity } from 'src/entities/drone.log.entity';

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

@WebSocketGateway(20206, { path: '/drone' })
export class DroneGateway {
  constructor(private readonly droneService: DroneService) {}

  @WebSocketServer()
  server: Server;

  private wsClients = [];

  async afterInit() {
    let globalCircleStep = 0;
    while (1) {
      if (globalCircleStep === 3600) {
        globalCircleStep = 0;
      } else {
        globalCircleStep += 1;
      }
      this.wsClients.forEach((client) => {
        const droneTestData = this.droneService.getDroneTestData({
          globalCircleStep,
        });
        client.send(
          JSON.stringify(
            Object.assign({
              data: { droneLog: droneTestData },
              statusCode: 200,
            }),
          ),
        );
      });
      await sleep(1000);
    }
  }

  async handleConnection(client: Socket) {
    let clientId = this.wsClients.push(client);
  }

  handleDisconnect(client: Socket) {
    let clientIndex = this.wsClients.find((wsClient) => wsClient === client);
    if (clientIndex !== -1) {
      this.wsClients.splice(clientIndex, 1);
    }
  }

  @SubscribeMessage('')
  handleMessages(client: Socket, payload: { name: string; text: string }) {
    client.send(
      JSON.stringify({
        number: 10,
        member: 'tony',
      }),
    );
  }

  sendToClientsDroneLogList(droneLogList: Array<DroneLogEntity>) {
    this.wsClients.forEach((client) => {
      client.send(
        JSON.stringify(
          Object.assign({
            data: { droneLog: droneLogList },
            statusCode: 200,
          }),
        ),
      );
    });
  }
}
