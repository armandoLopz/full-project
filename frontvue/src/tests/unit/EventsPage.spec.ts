import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from '@jest/globals'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import EventsPage from '@/components/EventsPage.vue'

describe('EventsPage.vue', () => {
  const vuetify = createVuetify({
    components,
    directives
  })

  const mountOptions = {
    global: {
      plugins: [vuetify]
    }
  }

  let wrapper: any

  beforeEach(() => {
    wrapper = mount(EventsPage, mountOptions)
  })

  it('renders the component correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the correct title for events', () => {
    const title = wrapper.find('h2')
    expect(title.text()).toBe('Eventos más destacados por nuestra comunidad')
  })

  it('renders the event cards correctly', () => {
    const eventCards = wrapper.findAllComponents({ name: 'v-card' })
    expect(eventCards.length).toBe(4)
  })

  it('renders the restaurant cards correctly', () => {
    const restaurantCards = wrapper.findAllComponents({ name: 'v-card' })
    expect(restaurantCards.length).toBeGreaterThanOrEqual(3)
  })

  it('checks the presence of explore buttons in restaurant cards', () => {
    const buttons = wrapper.findAllComponents({ name: 'v-btn' })
    expect(buttons.length).toBeGreaterThanOrEqual(3)
  })

  it('displays the correct restaurant name on each card', () => {
    const cardTitles = wrapper.findAllComponents({ name: 'v-card-title' })
    expect(cardTitles[0].text()).toBe('La Parrilla del Mar')
    expect(cardTitles[1].text()).toBe('El Refugio del Sabor')
    expect(cardTitles[2].text()).toBe('La Pizzería Toscana')
  })
})