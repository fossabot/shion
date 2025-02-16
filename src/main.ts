import 'uno.css'
import 'ant-design-vue/es/message/style/index.less'
import 'ant-design-vue/es/date-picker/style/index.less'
import './styles/index.css'

import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'

import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import {
  GraphicComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'

import { i18n } from '@locales/index'
import App from './App.vue'
import routes from '~pages'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const pinia = createPinia()

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  GraphicComponent,
])

createApp(App)
  .use(i18n)
  .use(router)
  .use(pinia)
  .component('v-chart', VChart)
  .mount('#app')

if (import.meta.env.PROD)
  window.addEventListener('contextmenu', e => e.preventDefault())
