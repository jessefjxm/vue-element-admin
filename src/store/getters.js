const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,

  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,

  token: state => state.user.token,
  roles: state => state.user.roles,
  userInfo: state => state.user.userInfo,

  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
