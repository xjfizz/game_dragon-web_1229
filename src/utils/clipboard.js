import { ElMessage } from 'element-plus';
import Clipboard from 'clipboard'

function clipboardSuccess(successText) {
 ElMessage({
   type:'success',
   message:successText ? successText : 'copy success!'
 })
}

function clipboardError() {
  ElMessage({
    type:'error',
    message:'copy error!'
  })
}

export default function handleClipboard(text, event, successText) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess(successText)
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
