// 예시 component
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import {
  increment,
  decrement,
  incrementByAmount,
} from '../store/slices/counterSlice';

import { Button } from './ui/Button';
import { Input } from './ui/input';

const Counter = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col items-center space-y-4 p-8">
      <div className="text-6xl font-bold text-blue-600">{count}</div>

      <div className="flex space-x-4">
        <button
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>

        <button
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          onClick={() => dispatch(increment())}
        >
          +
        </button>

        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={() => dispatch(incrementByAmount(5))}
        >
          +5
        </button>

        <Button
          primary
          label="+10"
          onClick={() => dispatch(incrementByAmount(10))}
          className="w-20"
        />
      </div>
      <Input placeholder="placeholder" size="medium" className="w-full" />
    </div>
  );
};

export default Counter;
