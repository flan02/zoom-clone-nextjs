
import { Copy } from 'lucide-react'
import React from 'react'

type Props = {
  text: string
}

const CopyClipboardButton = ({ text }: Props) => {
  return (
    <button
      title="Copy invitation link"
      onClick={() => {
        navigator.clipboard.writeText(text); // * Copy the link to the clipboard
        alert("Copied to clipboard");
      }}
    >
      <Copy />
    </button>
  )
}

export default CopyClipboardButton