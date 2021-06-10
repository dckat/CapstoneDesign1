import Vue from 'vue';

import {
  Breadcrumb, Icon, PageHeader, Alert, Result,
  Button, Layout, Table, Radio, Dropdown, Menu,
  Input, Calendar, Form, Tooltip, Select, Switch,
  Spin, Checkbox, Tabs, Pagination, notification,
  DatePicker, TimePicker, Divider, Card, Avatar,
  Row, Col, Modal, ConfigProvider, Descriptions, Badge,
  List, Progress, Slider, AutoComplete, 
} from 'ant-design-vue';

Vue.use(notification);
Vue.use(Badge);
Vue.use(AutoComplete);
Vue.use(List);
Vue.use(PageHeader);
Vue.use(Result);
Vue.use(Alert);
Vue.use(Modal);
Vue.use(Icon);
Vue.use(Divider);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Button);
Vue.use(Breadcrumb);
Vue.use(Layout);
Vue.use(Table);
Vue.use(Radio);
Vue.use(Dropdown);
Vue.use(Menu);
Vue.use(Input);
Vue.use(Calendar);
Vue.use(Form);
Vue.use(Tooltip);
Vue.use(Select);
Vue.use(Spin);
Vue.use(Checkbox);
Vue.use(Tabs);
Vue.use(Pagination);
Vue.use(Switch);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(ConfigProvider);
Vue.use(Descriptions);
Vue.use(Avatar);
Vue.use(Progress);
Vue.use(Slider);

Vue.prototype.$notification = notification;
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;
