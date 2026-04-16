import { render, screen } from '@testing-library/react'
import { ProjectCard } from '../ProjectCard'
import { describe, it, expect } from 'vitest'

const mockProject = {
  id: 1,
  title: "Test Project",
  category: "Design",
  slug: "test-project",
  color: "mint",
  imageTheme: "linear-gradient(to right, #000, #fff)"
}

describe('ProjectCard', () => {
  it('renders project title and category correctly', () => {
    render(<ProjectCard project={mockProject} />)
    
    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('Design')).toBeInTheDocument()
  })

  it('contains the correct link to project detail page', () => {
    render(<ProjectCard project={mockProject} />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/projects/test-project')
  })

  it('renders the project ID correctly', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('01')).toBeInTheDocument()
  })

  it('applies the correct background color class based on project color prop', () => {
    const { container } = render(<ProjectCard project={mockProject} />)
    const background = container.querySelector('.bg-mint')
    expect(background).toBeInTheDocument()
  })
})
