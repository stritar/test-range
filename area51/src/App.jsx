import { Icon } from './components/Icon';

export default function App() {
  return (
    <div>
      <h1>App</h1>
      <p>
        <Icon name="text" size="sm" />{' '}
        <Icon name="placeholder" size="sm" />{' '}
        <Icon name="image" size="sm" ariaLabel="Image" />
      </p>
    </div>
  );
}