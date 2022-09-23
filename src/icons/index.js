import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
// console.log(req.keys())
// console.log(req('./dashboard.svg'))
// console.log(require.context('./svg', false, /\.svg$/)('./dashboard.svg'))
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
// console.log(requireAll(req))
// console.log(req => req.keys().map(req))
// console.log(require.context('./svg', false, /\.svg$/).keys().map(require.context('./svg', false, /\.svg$/)))
