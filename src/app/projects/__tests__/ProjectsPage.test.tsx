import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Projects from '../page'
import { beforeEach, describe, it, expect, vi } from 'vitest'

const categories = [
  { _id: 'cat-logo', name: 'Logo Design', slug: 'logo-design' },
  { _id: 'cat-social', name: 'Social Media', slug: 'social-media' },
]

const subcategories = [
  {
    _id: 'sub-instagram',
    name: 'Instagram Post',
    slug: 'instagram-post',
    category_id: { _id: 'cat-social', name: 'Social Media', slug: 'social-media' },
  },
]

const projects = [
  {
    _id: 'project-logo',
    name: 'Logo Project',
    img: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    description: 'A logo identity project.',
    tools: ['Illustrator'],
    category_id: { _id: 'cat-logo', name: 'Logo Design', slug: 'logo-design' },
    subcategory_id: null,
  },
  {
    _id: 'project-social',
    name: 'Instagram Project',
    img: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    description: 'A social media project.',
    tools: ['Photoshop'],
    category_id: { _id: 'cat-social', name: 'Social Media', slug: 'social-media' },
    subcategory_id: {
      _id: 'sub-instagram',
      name: 'Instagram Post',
      slug: 'instagram-post',
    },
  },
]

function mockFetch() {
  vi.stubGlobal(
    'fetch',
    vi.fn((url: string) => {
      if (url === '/api/category') {
        return Promise.resolve({ json: () => Promise.resolve({ data: categories }) })
      }
      if (url === '/api/subcategory') {
        return Promise.resolve({ json: () => Promise.resolve({ data: subcategories }) })
      }
      if (url === '/api/project') {
        return Promise.resolve({ json: () => Promise.resolve({ data: projects }) })
      }
      return Promise.reject(new Error(`Unhandled fetch: ${url}`))
    })
  )
}

describe('Projects Page Integration', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    mockFetch()
  })

  it('renders database projects initially', async () => {
    render(<Projects />)

    expect(await screen.findByText('Logo Project')).toBeInTheDocument()
    expect(screen.getByText('Instagram Project')).toBeInTheDocument()
  })

  it('filters projects when a category button is clicked', async () => {
    render(<Projects />)

    const socialButton = await screen.findByRole('button', { name: /Social Media/i })
    fireEvent.click(socialButton)

    await waitFor(() => {
      expect(screen.queryByText('Logo Project')).not.toBeInTheDocument()
    })
    expect(screen.getByText('Instagram Project')).toBeInTheDocument()

    const allFilterButton = screen.getByRole('button', { name: /^All$/i })
    fireEvent.click(allFilterButton)

    expect(screen.getByText('Logo Project')).toBeInTheDocument()
    expect(screen.getByText('Instagram Project')).toBeInTheDocument()
  })

  it('shows relevant subcategories for the selected category', async () => {
    render(<Projects />)

    const socialButton = await screen.findByRole('button', { name: /Social Media/i })
    fireEvent.click(socialButton)

    expect(screen.getByRole('button', { name: /Instagram Post/i })).toBeInTheDocument()
    expect(socialButton).toHaveClass('bg-obsidian')
  })
})
