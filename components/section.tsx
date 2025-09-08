import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'default' | 'muted' | 'accent';
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ children, className, id, background = 'default', ...props }, ref) => {
    const backgroundClasses = {
      default: 'bg-background',
      muted: 'bg-muted/50',
      accent: 'bg-accent/50',
    };

    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          'py-12 md:py-20 px-6',
          backgroundClasses[background],
          className
        )}
        {...props}
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = 'Section';

export default Section;
