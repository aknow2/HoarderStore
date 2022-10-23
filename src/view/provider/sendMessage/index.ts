const sendMessage = async <M, R>(msg: M): Promise<R> => {
  return await new Promise((resolve) => {
    chrome.runtime.sendMessage(msg, (response: R) => {
      console.log('response in action', response)
      resolve(response)
    })
  })
}

export default sendMessage
