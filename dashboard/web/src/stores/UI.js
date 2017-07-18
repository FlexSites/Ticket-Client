import { extendObservable } from 'mobx'

class UiState {

  constructor () {
    extendObservable(this, {
      language: 'en_US',
      pendingRequestCount: 0,
      // asStructure makes sure observer won't be signaled only if the
      // dimensions object changed in a deepEqual manner
      // windowDimensions: asStructure({
      //   width: jquery(window).width(),
      //   height: jquery(window).height()
      // }),
      get appIsInSync () {
        return this.pendingRequestCount === 0
      },
    })
  }
}

export default new UiState()
