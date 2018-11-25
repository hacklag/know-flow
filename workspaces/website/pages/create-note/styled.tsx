import styled from '@shared/utils/styled'
import {Textarea} from 'evergreen-ui'
import * as React from 'react'
import {Editor as SlateEditor, EditorProps} from 'slate-react'

const StyledEditor = styled(Textarea).attrs({
  minHeight: 0,
  is: 'div',
  paddingY: 10,
  boxShadow: 'none',
})<any>`
  pre {
    color: #ccc;
    background: none;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;

    background: #2d2d2d;
    padding: 1em;
    margin: .5em 0;
    overflow: auto;
  }
  span[contenteditable="false"] {
    color: #a7b1bb;
    opacity: .8 !important;
  }
`

export const Editor = (props: EditorProps) => (
  <StyledEditor>
    <SlateEditor {...props}/>
  </StyledEditor>
)
