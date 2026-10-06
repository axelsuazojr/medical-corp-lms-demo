import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#32566f]/30',
  {
    variants: {
      variant: {
        default: 'bg-[#092f4c] text-white hover:bg-[#0d3d61]',
        outline: 'border border-slate-300 bg-white text-[#092f4c] hover:bg-slate-50',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
        ghost: 'text-[#092f4c] hover:bg-slate-100',
      },
      size: { default: 'h-10 px-4 py-2', sm: 'h-9 px-3', lg: 'h-11 px-6' },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean }
export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
}
export { buttonVariants }
