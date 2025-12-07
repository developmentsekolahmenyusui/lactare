'use client';
import { Button, type buttonVariants } from '~/shared/shadcn/button';
import { useMultiStepForm } from '~/shared/hooks/use-multi-step-viewer';
import { Stepper, StepperItem, StepperTrigger, StepperIndicator, StepperSeparator, StepperTitle } from './stepper';
import { AnimatePresence, motion, type MotionProps } from 'motion/react';
import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';

const NextButton = (
  props: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    },
) => {
  const { isLastStep, goToNext } = useMultiStepForm();
  if (isLastStep) return null;
  return <Button size='sm' type='button' onClick={() => goToNext()} {...props} />;
};

const PreviousButton = (
  props: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    },
) => {
  const { isFirstStep, goToPrevious } = useMultiStepForm();
  if (isFirstStep) return null;
  return <Button size='sm' type='button' variant='outline' onClick={() => goToPrevious()} {...props} />;
};

const SubmitButton = (
  props: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    },
) => {
  const { isLastStep, goToNext } = useMultiStepForm();
  if (!isLastStep) return null;
  return <Button size='sm' type='button' {...props} />;
};

const ResetButton = (
  props: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    },
) => {
  return <Button size='sm' type='button' variant='ghost' {...props} />;
};

const FormHeader = (props: React.ComponentProps<'div'>) => {
  const { currentStepIndex, steps } = useMultiStepForm();
  return (
    <div className='flex flex-col items-start justify-center gap-1 pb-4' {...props}>
      <Stepper value={currentStepIndex} orientation='horizontal'>
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isLast = stepNumber === steps.length;
          return (
            <StepperItem key={stepNumber} step={stepNumber} className='items-start not-last:flex-1'>
              <div className='flex flex-col items-center gap-y-3'>
                <StepperIndicator />
                <StepperTitle className='text-muted-foreground group-data-[state=active]/step:text-foreground group-data-[state=completed]/step:text-foreground text-xs font-medium'>
                  {step.title}
                </StepperTitle>
              </div>
              <StepperTrigger />
              {!isLast && <StepperSeparator className='-mx-10 mt-3' />}
            </StepperItem>
          );
        })}
      </Stepper>
    </div>
  );
};

const FormFooter = (props: React.ComponentProps<'div'>) => {
  return <div className='flex w-full items-center justify-center gap-3' {...props} />;
};

const StepFields = (props: React.ComponentProps<'div'> & MotionProps) => {
  const { currentStepIndex, steps } = useMultiStepForm();
  const currentFormStep = steps[currentStepIndex - 1];
  if (!currentFormStep || currentStepIndex < 1 || currentStepIndex > steps.length) {
    return null;
  }
  return (
    <AnimatePresence mode='popLayout'>
      <motion.div
        key={currentStepIndex}
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -15 }}
        transition={{ duration: 0.4, type: 'spring' }}
        {...props}
        className='grid gap-4'
      >
        {currentFormStep.component}
      </motion.div>
    </AnimatePresence>
  );
};

function MultiStepFormContent(props: React.ComponentProps<'div'>) {
  return <div className='flex flex-col gap-5 pt-3' {...props} />;
}

export {
  MultiStepFormContent,
  FormHeader,
  FormFooter,
  StepFields,
  NextButton,
  PreviousButton,
  SubmitButton,
  ResetButton,
};
