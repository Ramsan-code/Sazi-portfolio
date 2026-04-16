import { render, screen, fireEvent } from '@testing-library/react'
import Projects from '../page'
import { describe, it, expect, vi } from 'vitest'

// Mock the actual projects data
vi.mock('@/data/projects', () => ({
  PROJECTS: [
    { id: 1, title: 'Branding Project', category: 'Branding', slug: 'branding-1', color: 'mint', imageTheme: '' },
    { id: 2, title: 'UI Project', category: 'UI/UX', slug: 'ui-1', color: 'peri', imageTheme: '' },
  ],
  CATEGORIES: ['All', 'Branding', 'UI/UX']
}))

describe('Projects Page Integration', () => {
  it('renders all projects initially', () => {
    render(<Projects />)
    expect(screen.getByText('Branding Project')).toBeInTheDocument()
    expect(screen.getByText('UI Project')).toBeInTheDocument()
  })

  it('filters projects when a category button is clicked', () => {
    render(<Projects />)
    
    const uiFilterButton = screen.getByRole('button', { name: /UI\/UX/i })
    fireEvent.click(uiFilterButton)
    
    expect(screen.queryByText('Branding Project')).not.toBeInTheDocument()
    expect(screen.getByText('UI Project')).toBeInTheDocument()
    
    const allFilterButton = screen.getByRole('button', { name: /All/i })
    fireEvent.click(allFilterButton)
    
    expect(screen.getByText('Branding Project')).toBeInTheDocument()
    expect(screen.getByText('UI Project')).toBeInTheDocument()
  })

  it('applies active styles to selected filter', () => {
    render(<Projects />)
    const brandingButton = screen.getByRole('button', { name: /Branding/i })
    
    fireEvent.click(brandingButton)
    expect(brandingButton).toHaveClass('bg-obsidian') // Active state class
  })
})
