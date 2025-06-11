import { setActivePinia, createPinia } from 'pinia'
import { useAnimateStore } from '../animate'

describe('Animate Store', () => {
  let store: ReturnType<typeof useAnimateStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useAnimateStore()
  })

  it('should have default values', () => {
    expect(store.Animate).toBe(false)
    expect(store.AnimationList).toEqual([])
    expect(store.AnimationImgList).toEqual([])
  })

  it('should update Animate value', async () => {
    await store.SetAnimate(true)
    expect(store.Animate).toBe(true)
  })

  it('should update AnimationList', async () => {
    const testList = [1, 2, 3]
    await store.SetAnimationList(testList)
    expect(store.AnimationList).toEqual(testList)
  })

  it('should update AnimationImgList', async () => {
    const testImgList = ['img1.png', 'img2.png']
    await store.SetAnimationImgList(testImgList)
    expect(store.AnimationImgList).toEqual(testImgList)
  })
})
