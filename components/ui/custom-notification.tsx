import { CustomNotificationProps } from '@/types';
import cx from 'clsx';
import Success from '@/assets/svg/success.svg';
import Error from '@/assets/svg/error.svg';
import Info from '@/assets/svg/info.svg';
import Warning from '@/assets/svg/warning.svg';
export function CustomNotification({
  data,
  toastProps,
}: CustomNotificationProps) {
  const isColored = toastProps.theme === 'colored';
  const messages = {
    success: 'All Set!',
    error: 'Something Went Wrong',
    info: 'Heads Up!',
    warning: 'Attention Required',
  };

  const icon = {
    success: <Success className='w-10 h-10' aria-hidden='true' />,
    error: <Error className='w-10 h-10' aria-hidden='true' />,
    info: <Info className='w-10 h-10' aria-hidden='true' />,
    warning: <Warning className='w-10 h-10' aria-hidden='true' />,
  };
  const message = messages[data.variant] || 'An error occurred';
  const icons = icon[data.variant];
  return (
    <div className='flex justify-between items-center gap-2 w-full'>
      {icons}
      <div className='flex flex-col flex-1 '>
        <h3
          className={cx(
            'text-md font-bold',
            isColored ? 'text-white' : 'text-black'
          )}
        >
          {message}
        </h3>
        <div className='flex items-center justify-between'>
          <p className='text-sm font-normal text-gray-800'>{data.content}</p>
        </div>
      </div>
    </div>
  );
}
