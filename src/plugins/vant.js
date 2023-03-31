// 按需全局引入 vant组件

import Vue from 'vue'
import {
  Button,
  Card, // 卡片
  Cell,
  CellGroup, // 单元格
  Checkbox,
  CheckboxGroup, // 复选框
  CountDown, // 倒计时
  Dialog, // 确认弹窗
  Divider, // 分割线
  Empty, // 空状态
  Field, // input输入栏
  Form,
  Icon,
  Image as VanImage, // 图
  ImagePreview, // 图片预览
  Lazyload, // 懒加载
  List,
  Loading, // loading
  NavBar,
  Overlay, // 蒙层
  Popup, // 弹窗
  Picker,
  Radio,
  RadioGroup, // 单选框
  Step,
  Steps, // 步骤条
  Sticky, // 粘性布局
  Swipe,
  SwipeItem, // 轮播
  // SwipeCell, // 滑动单元格
  Tabbar,
  TabbarItem, // 标签栏
  Tag, // 标签
  Toast, // 轻提示
  // TreeSelect // 分类选择
  Uploader // 上传文件
} from 'vant'

// 按A~Z排列
Vue.use(Button)
  .use(Card)
  .use(Cell)
  .use(CellGroup)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(CountDown)
  .use(Dialog)
  .use(Divider)
  .use(Empty)
  .use(Field)
  .use(Form)
  .use(Icon)
  .use(VanImage)
  .use(ImagePreview)
  .use(Lazyload)
  .use(List)
  .use(Loading)
  .use(NavBar)
  .use(Overlay)
  .use(Popup)
  .use(Picker)
  .use(Radio)
  .use(RadioGroup)
  .use(Step)
  .use(Steps)
  .use(Sticky)
  .use(Swipe)
  .use(SwipeItem)
  // .use(SwipeCell)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Tag)
  .use(Toast)
  .use(Uploader)
