import Container from '@/app/components/Container';
import { singleLevelNestedRoutes } from '@/app/libs/routes';
import Link from 'next/link';


const LegalPage = () => {
  return (
    <Container>
        <div className='grid grid-cols-1 font-semibold mt-8 gap-4'>
            <div>
                <Link href={singleLevelNestedRoutes.legal.fr} className='hover:text-primary'>Mentions légales</Link>

            </div>

            <div>
            <Link href={singleLevelNestedRoutes.legal.nl} className='hover:text-primary'>Juridische vermeldingen</Link>

            </div>
        </div>
    </Container>
  )
}

export default LegalPage