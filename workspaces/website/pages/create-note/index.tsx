import {navigate} from '@reach/router'
import {Container, InputList, Title} from '@shared/components'
import {Heading, Paragraph} from '@shared/components/typography'
import {TopBar} from '@website/components/top-bar'
import {WithStore} from '@website/types'
import {Button, TagInput, TextInput} from 'evergreen-ui'
import {observable} from 'mobx'
import {inject, observer} from 'mobx-react'
import Prism from 'prismjs'
import * as React from 'react'
import {hot} from 'react-hot-loader'
import {Value} from 'slate'
import {Editor} from './styled'

export interface Props extends WithStore {

}

function CodeBlock(props: any) {
  const {editor, node} = props
  const language = node.data.get('language')

  function onChange(event: any) {
    editor.setNodeByKey(node.key, {data: {language: event.target.value}})
  }

  return (
    <div style={{position: 'relative'}}>
      <pre>
        <code {...props.attributes}>{props.children}</code>
      </pre>
      <div
        contentEditable={false}
        style={{position: 'absolute', top: '5px', right: '5px'}}
      >
        <select value={language} onChange={onChange}>
          <option value="css">CSS</option>
          <option value="js">JavaScript</option>
          <option value="html">HTML</option>
        </select>
      </div>
    </div>
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

const initialValue = Value.fromJSON({
  'document': {
    'nodes': [
      {
        'object': 'block',
        'type': 'paragraph',
        'nodes': [
          {
            'object': 'text',
            'leaves': [
              {
                'text':
                  // tslint:disable-next-line:max-line-length
                  'There are certain behaviors that require rendering dynamic marks on string of text, like rendering code highlighting. For example:',
              },
            ],
          },
        ],
      },
      {
        'object': 'block',
        'type': 'code',
        'data': {
          'language': 'js',
        },
        'nodes': [
          {
            'object': 'block',
            'type': 'code_line',
            'nodes': [
              {
                'object': 'text',
                'leaves': [
                  {
                    'text': '// A simple implementation.',
                  },
                ],
              },
            ],
          },
          {
            'object': 'block',
            'type': 'code_line',
            'nodes': [
              {
                'object': 'text',
                'leaves': [
                  {
                    'text': 'for (var i = 1; i <= 100; i++) {',
                  },
                ],
              },
            ],
          },
          {
            'object': 'block',
            'type': 'code_line',
            'nodes': [
              {
                'object': 'text',
                'leaves': [
                  {
                    'text': '  if (i % 15 == 0) {',
                  },
                ],
              },
            ],
          },
          {
            'object': 'block',
            'type': 'code_line',
            'nodes': [
              {
                'object': 'text',
                'leaves': [
                  {
                    'text': '    console.log(\'Fizz Buzz\');',
                  },
                ],
              },
            ],
          },
          {
            'object': 'block',
            'type': 'code_line',
            'nodes': [
              {
                'object': 'text',
                'leaves': [
                  {
                    'text': '  } else if (i % 5 == 0) {',
                  },
                ],
              },
            ],
          },
          {
            'object': 'block',
            'type': 'code_line',
            'nodes': [
              {
                'object': 'text',
                'leaves': [
                  {
                    'text': '    console.log(\'Buzz\');',
                  },
                ],
              },
            ],
          },
          {
            'object': 'block',
            'type': 'code_line',
            'nodes': [
              {
                'object': 'text',
                'leaves': [
                  {
                    'text': '  } else if (i % 3 == 0) {',
                  },
                ],
              },
            ],
          },
          {
            'object': 'block',
            'type': 'code_line',
            'nodes': [
              {
                'object': 'text',
                'leaves': [
                  {
                    'text': '    console.log(\'Fizz\');',
                  },
                ],
              },
            ],
          },
          {
            'object': 'block',
            'type': 'code_line',
            'nodes': [
              {
                'object': 'text',
                'leaves': [
                  {
                    'text': '  } else {',
                  },
                ],
              },
            ],
          },
          {
            'object': 'block',
            'type': 'code_line',
            'nodes': [
              {
                'object': 'text',
                'leaves': [
                  {
                    'text': '    console.log(i);',
                  },
                ],
              },
            ],
          },
          {
            'object': 'block',
            'type': 'code_line',
            'nodes': [
              {
                'object': 'text',
                'leaves': [
                  {
                    'text': '  }',
                  },
                ],
              },
            ],
          },
          {
            'object': 'block',
            'type': 'code_line',
            'nodes': [
              {
                'object': 'text',
                'leaves': [
                  {
                    'text': '}',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        'object': 'block',
        'type': 'paragraph',
        'nodes': [
          {
            'object': 'text',
            'leaves': [
              {
                'text': 'Try it out for yourself!',
              },
            ],
          },
        ],
      },
    ],
  },
})

@inject('store')
@observer
class CreateNote extends React.Component<Props> {
  private get allowSubmit(): boolean {
    return this.form.value('title').trim().length >= 2
  }
  private errors = observable.map()
  private isLoading = observable.box(false)
  private form = this.props.store.formStore.add('create-note', {
    title: {
      autoFocus: true,
      placeholder: 'Type note title...',
    },
    tags: {
      value: [],
      formatValue: (value) => value,
      placeholder: 'Add tags...',
    },
    content: {
      value: initialValue,
      formatValue: ({value}) => value,
      placeholder: 'Type note content...',
    },
  })

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Title />
        <TopBar />
        <Container pv="md">
          <Heading size={600}>Create a Note</Heading>
          <Paragraph>
            Learned something useful? Share it with other workspace members!
          </Paragraph>
          <InputList errors={this.errors} mt="xs">
            <TextInput
              height={40}
              width="100%"
              value={this.form.value('title')}
              {...this.form.field('title')}
            />
              <TagInput
                inputProps={{placeholder: 'Add tags...'}}
                width="100%"
                tagProps={{height: 20}}
                height={40}
                boxShadow="none"
                values={this.form.value('tags')}
                {...this.form.field('tags')}
              />
            <Editor
              value={this.form.value('content')}
              {...this.form.field('content')}
              renderNode={this.renderNode}
              onKeyDown={this.onKeyDown}
              renderMark={this.renderMark}
              decorateNode={this.decorateNode}
            />
            <div>
              <Button
                height={40}
                type="submit"
                isLoading={this.isLoading.get()}
                disabled={!this.allowSubmit}
              >
                {this.isLoading.get() ? 'Creating...' : 'Create'}
              </Button>
            </div>
          </InputList>

        </Container>
      </form>
    )
  }

  private handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      this.isLoading.set(true)
      const story = await this.props.store.storyStore.create(
        this.form.data,
        this.props.store.workspaceStore.workspace.id
      )
      navigate(`/story/${story.id}`)
    } catch (err) {
      this.errors.replace(err.response.data)
    } finally {
      this.isLoading.set(false)
    }
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

export default hot(module)(CreateNote)
