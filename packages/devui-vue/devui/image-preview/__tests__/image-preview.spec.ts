import { mount } from '@vue/test-utils'
import { ImagePreviewDirective } from '../index'
import { ref } from 'vue'

// 指令图片模板
const imageTemplate = `
  <img id="testImg" src="https://devui.design/components/assets/image1.png" />
  <img src="https://devui.design/components/assets/image3.png" />
`
// 全局属性
const global = {
  directives: {
    dImagePreview: ImagePreviewDirective
  }
}

describe('image-preview', () => {
  it('image-preview click', async () => {
    const wrapper = mount(
      {
        template: `
          <div v-d-image-preview>
            ${imageTemplate}
          </div>
        `
      },
      {
        global
      }
    )
    const img = wrapper.find('#testImg')
    await img.trigger('click')
    const ele = document.querySelector('.devui-image-preview-main-image')
    expect(ele).toBeTruthy()
    const closeBtn = document.querySelector('.devui-image-preview-close-btn') as any
    closeBtn.click()
  })

  it('image-preview disableDefault', async () => {
    const wrapper = mount(
      {
        template: `
          <div v-d-image-preview="{disableDefault: true}">
            ${imageTemplate}
          </div>
        `
      },
      {
        global
      }
    )
    const img = wrapper.find('#testImg')
    await img.trigger('click')
    const ele = document.querySelector('.devui-image-preview-main-image')
    expect(ele).toBeFalsy()
  })

  it('image-preview custom', async () => {
    const custom: any = ref({})
    const open = () => custom.value.open()
    const wrapper = mount(
      {
        template: `
          <div v-d-image-preview="{custom, disableDefault:true}">
            ${imageTemplate}
          </div>
          <button id="open" @click="open">open</button>
        `,
        setup() {
          return {
            custom,
            open
          }
        }
      },
      {
        global
      }
    )
    const customBtn = wrapper.find('#open')
    await customBtn.trigger('click')
    const ele = document.querySelector('.devui-image-preview-main-image')
    expect(ele).toBeTruthy()
    const closeBtn = document.querySelector('.devui-image-preview-close-btn') as any
    closeBtn.click()
  })
})
