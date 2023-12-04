
import option from "../option/option";

const ThankYouForm = () => {

  return (
    <div>

      <form className='left'>
        <h1>Felicidades!</h1>
        <p> Te has inscrito con éxito. En breve nos comunicaremos contigo</p>

        <div className='buttons'>
          <button className='top' disabled={!option} type='submit'>Ir a tus cursos</button>
        </div>
      </form>
      <img src="/images/purchase/payment.png" alt="" />
    </div>
  )
}
export default ThankYouForm;