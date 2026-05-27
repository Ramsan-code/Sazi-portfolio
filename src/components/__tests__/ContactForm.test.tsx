import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ContactForm } from '../ContactForm'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { toast } from 'sonner'

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe('ContactForm Integration & Regression', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn().mockResolvedValue({ ok: true })
    console.log = vi.fn()
  })

  it('shows validation errors for empty fields', async () => {
    render(<ContactForm />)
    
    const submitButton = screen.getByText(/Request Design Quote/i)
    fireEvent.click(submitButton)

    expect(await screen.findByText(/Name must be at least 2 characters/i)).toBeInTheDocument()
    expect(await screen.findByText(/Must be a valid email address/i)).toBeInTheDocument()
    expect(await screen.findByText(/Message must be at least 10 characters/i)).toBeInTheDocument()
  })

  it('successfully submits the form with valid data', async () => {
    render(<ContactForm />)
    
    fireEvent.change(screen.getByPlaceholderText(/ALICE WONDERLAND/i), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByPlaceholderText(/ALICE@RAD-STARTUP.COM/i), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByPlaceholderText(/TELL ME ABOUT YOUR BRAND, LOGO, POSTER, OR UI\/UX PROJECT/i), { target: { value: 'This is a test message for the project.' } })

    const submitButton = screen.getByText(/Request Design Quote/i)
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "MISSION RECEIVED. STAND BY FOR TRANSMISSION.",
        expect.any(Object)
      )
    })
  })

  it('REGRESSION: does not call console.log on submission (fix verified)', async () => {
    render(<ContactForm />)
    
    fireEvent.change(screen.getByPlaceholderText(/ALICE WONDERLAND/i), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByPlaceholderText(/ALICE@RAD-STARTUP.COM/i), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByPlaceholderText(/TELL ME ABOUT YOUR BRAND, LOGO, POSTER, OR UI\/UX PROJECT/i), { target: { value: 'This is a test message for the project.' } })

    const submitButton = screen.getByText(/Request Design Quote/i)
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(console.log).not.toHaveBeenCalled()
    })
  })
})
