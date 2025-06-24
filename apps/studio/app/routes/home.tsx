import { Button } from '@tazeai/ui/components/button';
import type { Route } from './+types/home';
import { toast } from 'sonner';

export function meta(props: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  const handleClick = () => {
    toast.success('Hello');
  };
  return (
    <div>
      <Button onClick={handleClick}>Click me</Button>
    </div>
  );
}
