/*
 * @Author: Sun ruiqi
 * @Date: 2025-06-09 15:22:13
 * @LastEditors: viola
 * @LastEditTime: 2025-06-09 15:35:52
 * @FilePath: \code\src\stores\__tests__\map.spec.ts
 */
import { setActivePinia, createPinia } from 'pinia'
import { defineStore } from "pinia";
import { useMapStore } from '../map'

describe('map store', () => {
  let store: ReturnType<typeof useMapStore>

  beforeEach(() => {
    // 初始化 Pinia 实例并激活
    setActivePinia(createPinia())
    store = useMapStore()
  })

  it('initial state should be correct', () => {
    expect(store.Drone2DShow).toBe(false)
    expect(store.Drone3DShow).toBe(false)
    expect(store.FlightPathShow).toBe(false)
    expect(store.CurrentMode).toBe('3D')
    expect(store.drawFlightPath).toBeNull()
  })

  it('setDrone2DShow should update Drone2DShow', async () => {
    await store.setDrone2DShow(true)
    expect(store.Drone2DShow).toBe(true)
  })

  it('setDrone3DShow should update Drone3DShow', async () => {
    await store.setDrone3DShow(true)
    expect(store.Drone3DShow).toBe(true)
  })

  it('setFlightPathShow should update FlightPathShow', async () => {
    await store.setFlightPathShow(true)
    expect(store.FlightPathShow).toBe(true)
  })

  it('setCurrentMode should update CurrentMode', async () => {
    await store.setCurrentMode('2D')
    expect(store.CurrentMode).toBe('2D')
  })

  it('getCurrentMode should return current mode', () => {
    store.CurrentMode = '2D'
    expect(store.getCurrentMode()).toBe('2D')
  })

  it('getFlightPathShow should return correct value', () => {
    store.FlightPathShow = true
    expect(store.getFlightPathShow()).toBe(true)
  })
})
