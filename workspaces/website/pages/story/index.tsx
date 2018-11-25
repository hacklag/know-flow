import {Container, Title} from '@shared/components'
import {Heading} from '@shared/components/typography'
import {Toolbar} from '@website/components/toolbar'
import {TopBar} from '@website/components/top-bar'
import {WithParams, WithStore} from '@website/types'
import {Spinner} from 'evergreen-ui'
import {Pane} from 'evergreen-ui'
import {observable} from 'mobx'
import {inject, observer} from 'mobx-react'
import Prism from 'prismjs'
import * as React from 'react'
import {hot} from 'react-hot-loader'
import {Editor} from './styled'

export interface Props extends WithStore, WithParams<{
  id: string
}> {

}

function CodeBlock(props: any) {
  return (
    <pre>
      <code {...props.attributes}>{props.children}</code>
    </pre>
  )
}

function CodeBlockLine(props: any) {
  return <div {...props.attributes}>{props.children}</div>
}

function getContent(token: string | {content: string | any[]}) {
  if (typeof token === 'string') {
    return token
  } else if (typeof token.content === 'string') {
    return token.content
  } else {
    return token.content.map(getContent).join('')
  }
}

@inject('store')
@observer
class Story extends React.Component<Props> {
  @observable story = null
  private isLoading = observable.box(true)

  async  componentDidMount() {
    const storyId = parseInt(this.props.id, 10)

    this.isLoading.set(true)
    this.story = await this.props.store.storyStore.find(storyId)
    this.isLoading.set(false)
  }

  render() {
    if (this.isLoading.get()) {
      return (
        <div>
          <Title />
          <TopBar />
          <Toolbar />
          <Pane display="flex" justifyContent="center" marginTop={128}>
            <Spinner />
          </Pane>
        </div>
      )
    }

    return (
      <div>
        <Title />
        <TopBar />
        <Toolbar />
        <Container pv="md">
          <Heading size={600}>{this.story.title}</Heading>
          <Editor
            readOnly
            value={this.story.slateContent}
            renderNode={this.renderNode}
            onKeyDown={this.onKeyDown}
            renderMark={this.renderMark}
            decorateNode={this.decorateNode}
          />
        </Container>
      </div>
    )
  }

  private renderNode = (props, _editor, next) => {
    const {attributes, children, node} = props

    switch (node.type) {
      case 'code':
        return <CodeBlock {...props} />
      case 'code_line':
        return <CodeBlockLine {...props} />
      case 'paragraph':
        return <p {...attributes}>{children}</p>
      default:
        return typeof next === 'function' ? next() : next
    }
  }

  private renderMark = (props, _editor, next) => {
    const {children, mark, attributes} = props

    switch (mark.type) {
      case 'comment':
      case 'block-comment':
      case 'prolog':
      case 'doctype':
      case 'cdata':
        return (
          <span {...attributes} style={{
            color: '#999',
          }}>
            {children}
          </span>
        )
      case 'punctuation':
        return (
          <span {...attributes} style={{
            color: '#ccc',
          }}>
            {children}
          </span>
        )
      case 'tag':
      case 'attr-name':
      case 'namespace':
      case 'deleted':
        return (
          <span {...attributes} style={{
            color: '#e2777a',
          }}>
            {children}
          </span>
        )
      case 'function-name':
        return (
          <span {...attributes} style={{
            color: '#6196cc',
          }}>
            {children}
          </span>
        )
      case 'boolean':
      case 'number':
      case 'function':
        return (
          <span {...attributes} style={{
            color: '#f08d49',
          }}>
            {children}
          </span>
        )
      case 'property':
      case 'class-name':
      case 'constant':
      case 'symbol':
        return (
          <span {...attributes} style={{
            color: '#f8c555',
          }}>
            {children}
          </span>
        )
      case 'selector':
      case 'important':
      case 'atrule':
      case 'keyword':
      case 'builtin':
        return (
          <span {...attributes} style={{
            color: '#cc99cd',
            fontWeight: ['important', 'bold'].includes(mark.type) ? 'bold' : undefined,
          }}>
            {children}
          </span>
        )
      case 'string':
      case 'char':
      case 'attr-value':
      case 'regex':
      case 'variable':
        return (
          <span {...attributes} style={{
            color: '#7ec699',
          }}>
            {children}
          </span>
        )
      case 'operator':
      case 'entity':
      case 'url':
        return (
          <span {...attributes} style={{
            color: '#67cdcc',
            cursor: mark.type === 'entity' ? 'help' : undefined,
          }}>
            {children}
          </span>
        )
      case 'italic':
        return (
          <span {...attributes} style={{
            fontStyle: 'italic',
          }}>
            {children}
          </span>
        )
      default:
        return next()
    }
  }

  /**
   * On key down inside code blocks, insert soft new lines.
   *
   * @param {Event} event
   * @param {Editor} editor
   * @param {Function} next
   */

  private onKeyDown = (event, editor, next) => {
    const {value} = editor
    const {startBlock} = value

    if (event.key === 'Enter' && startBlock.type === 'code') {
      editor.insertText('\n')

      return
    }

    next()
  }

  /**
   * Decorate code blocks with Prism.js highlighting.
   *
   * @param {Node} node
   * @return {Array}
   */

  private decorateNode = (node, _editor, next) => {
    const others = next() || []
    if (node.type !== 'code') { return others }

    const language = node.data.get('language')
    const texts = node.getTexts().toArray()
    const str = texts.map(t => t.text).join('\n')
    const grammar = Prism.languages[language]
    const tokens = Prism.tokenize(str, grammar)
    const decorations = []
    let startText = texts.shift()
    let endText = startText
    let startOffset = 0
    let endOffset = 0
    let start = 0

    for (const token of tokens) {
      startText = endText
      startOffset = endOffset

      const content = getContent(token)
      const newlines = content.split('\n').length - 1
      const length = content.length - newlines
      const end = start + length

      let available = startText.text.length - startOffset
      let remaining = length

      endOffset = startOffset + remaining

      while (available < remaining && texts.length > 0) {
        endText = texts.shift()
        remaining = length - available
        available = endText.text.length
        endOffset = remaining
      }

      if (typeof token !== 'string') {
        const dec = {
          anchor: {
            key: startText.key,
            offset: startOffset,
          },
          focus: {
            key: endText.key,
            offset: endOffset,
          },
          mark: {
            type: token.type,
          },
        }

        decorations.push(dec)
      }

      start = end
    }

    return [...others, ...decorations]
  }
}

export default hot(module)(Story)
