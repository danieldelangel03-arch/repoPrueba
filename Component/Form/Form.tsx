import type { Game } from '../../Type';
import './Form.css';

interface FormProps {
  game: Game;
}

const Form = ({ game }: FormProps) => {
  return (
    <div className='form'>
      <img src={game.image} alt={game.title} />
      <div className='form-content'>
        <h2>{game.title}</h2>
        <p>{game.description}</p>
        <span className={`status ${game.status === 'Active' ? 'active' : 'inactive'}`}>
          {game.status}
        </span>
      </div>
    </div>
  );
};

export default Form;