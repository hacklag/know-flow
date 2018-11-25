import {MessageBag} from '@shared/types/message-bag'
import {getRoot, types} from 'mobx-state-tree'

const Field = {
  name: types.string,
  placeholder: types.maybe(types.string),
  value: types.frozen(),
  formatValue: undefined,
}

export const Form = types
  .model('Form', {
    name: types.string,
    fields: types.optional(types.map(types.frozen(Field)), {}),
    originalFields: types.optional(types.map(types.frozen(Field)), {}),
    errors: types.optional(MessageBag, {}),
  })
  .views(self => ({
    value(name: string, defaultValue: any = ''): any {
      return self.fields.get(name).value || defaultValue
    },
    get data(): any  {
      return Array.from(self.fields.entries())
        .reduce((all, [name, attrs]) => {
          return {
            ...all,
            [name]: attrs.value,
          }
        }, {})
    },
  }))
  .actions(self => ({
    afterCreate() {
      self.originalFields.replace(self.fields)
    },
    handleChange(event: React.FormEvent<HTMLInputElement> | string, value?: any) {
      const name = typeof event === 'string' ? event : event.currentTarget.name
      const val = typeof event === 'string' ? value : event.currentTarget.value

      self.fields.set(name, {
        ...self.fields.get(name),
        value: val || '',
      })
    },
  }))
  .actions(self => ({
    clear() {
      self.fields.replace(self.originalFields)
    },
    field(name: string): any {
      const {t} = getRoot<any>(self)
      const {placeholder, formatValue, ...props} = self.fields.get(name)

      return {
        ...props,
        name,
        id: name,
        placeholder: t ? t`${placeholder}` : placeholder,
        // tslint:disable-next-line:max-line-length
        onChange: formatValue
          ? (value: any) => self.handleChange(name, formatValue(value))
          : self.handleChange,
      }
    },
  }))

type FormType = typeof Form.Type
export interface Form extends FormType {}
