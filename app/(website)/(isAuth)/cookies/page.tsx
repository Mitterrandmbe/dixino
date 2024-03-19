import Container from '@/app/components/Container';
import { singleLevelNestedRoutes } from '@/app/libs/routes';
import Link from 'next/link';


const CookiesPage = () => {
  return (
    <Container>
        <div className='grid grid-cols-1 font-semibold mt-8 gap-4'>
            <div>
                <Link href={singleLevelNestedRoutes.cookies.en} className='hover:text-primary'>Cookie policy</Link>

            </div>

            <div>
            <Link href={singleLevelNestedRoutes.cookies.fr} className='hover:text-primary'>Politique relative aux cookies</Link>

            </div>

            <div>
            <Link href={singleLevelNestedRoutes.cookies.nl} className='hover:text-primary'>Cookie beleid</Link>

            </div>
        </div>
    </Container>
  )
}

export default CookiesPage