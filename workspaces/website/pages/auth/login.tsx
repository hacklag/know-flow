import * as Router from '@reach/router'
import {InputList, Title} from '@shared/components'
import {Heading} from '@shared/components/typography'
import {isEmail} from '@shared/utils/is-email'
import {AuthForm} from '@website/pages/auth/styled'
import {WithStore} from '@website/types'
import {as} from '@website/utils/as'
import {Button, Pane, TextInput} from 'evergreen-ui'
import {observable} from 'mobx'
import {inject, observer} from 'mobx-react'
import * as React from 'react'
import {hot} from 'react-hot-loader'

@inject('store')
@as.member(() => <Router.Redirect to="/" noThrow />)
@hot(module)
@observer
class Login extends React.Component<WithStore> {
  private errors = observable.map()
  private isLoading = observable.box(false)
  private form = this.props.store.formStore.add('login', {
    username: {
      autoFocus: true,
      placeholder: 'Type email...',
    },
    password: {
      type: 'password',
      placeholder: 'Type password...',
    },
  })

  render() {
    const {t} = this.props.store

    return (
      <React.Fragment>
        <Title>Login</Title>
        <AuthForm onSubmit={this.handleSubmit}>
          <Heading size={600}>{t`Welcome back!`}</Heading>

          <InputList errors={this.errors} mt="md">
            <TextInput height={40} width="100%" value={this.form.value('username')} {...this.form.field('username')}/>
            <TextInput height={40} width="100%" value={this.form.value('password')} {...this.form.field('password')}/>
          </InputList>

          <Pane marginTop="16px">
            <Button
              height={40}
              type="submit"
              isLoading={this.isLoading.get()}
              disabled={!this.allowSubmit}
            >
              {t`Sign in`}
            </Button>

            <Button
              is="a"
              height={40}
              appearance="minimal"
              marginLeft="16px"
              onClick={() => Router.navigate('/auth/register')}
            >
              {t`No account?`}
            </Button>
          </Pane>
        </AuthForm>
      </React.Fragment>
    )
  }

  private get allowSubmit(): boolean {
    return isEmail(this.form.value('username')) && this.form.value('password')
  }

  private handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      this.isLoading.set(true)
      await this.props.store.userStore.login(this.form.data)
    } catch (err) {
      this.errors.replace(err.response.data)
    } finally {
      this.isLoading.set(false)
    }
  }
}

export default Login
