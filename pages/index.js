import Head from 'next/head'
import Compound from '@compound-finance/compound-js';
import calculateApy from '../apy.js';  
///we centered div line 15 to 24
// table with Ticker, Supply, CompAPY, TotalApy line 28
export default function Home({ apys }){
    const formatPercent = number =>
        `${new Number(number).toFixed(2)}%`

    return (
        <div className='container'>
            <Head>
                <title>Compound DashBoard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className='row mt-4'>
                <div className='col-sm-12'>
                    <div className="jumbotron">
                        <h1 className='text-center'>Compound DashBoard</h1>
                        <h5 className="display-4 text-center">Shows Compound APYS <br/> with Comp Token rewards</h5>

                    </div>
                    
                </div>

            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Supply</th>
                        <th>Comp APY</th>
                        <th>Total APY</th>

                    </tr>
                </thead>
                <tbody>
                    {apys && apys.map(apy => (
                        <tr key={apy.ticker}>
                            <td>
                                <img src={`img/${apy.ticker.toLowerCase()}.png`}
                                    style={{width: 25, marginRight: 10}}
                                />
                                {apy.ticker.toUpperCase()}
                            </td>
                            <td>
                            {formatPercent(apy.supplyApy)}
                            </td>
                            <td>
                                {formatPercent(parseFloat(apy.compApy))}
                            </td>
                            <td>
                                {formatPercent(parseFloat(apy.supplyApy))}
                            </td>
                            <td>
                                {formatPercent(parseFloat(apy.supplyApy) + parseFloat(apy.compApy))}
                            </td>

                        </tr>
                    ))}


                </tbody>
            </table>

        </div>
    )
}

export async function getServerSideProps(context){
    const apys = await Promise.all([
        calculateApy(Compound.cDAI, "DAI"),
        calculateApy(Compound.cUSDC, 'USDC'),
        calculateApy(Compound.cUSDT, "USDT"),
    ]);

    return{
        props: {
            apys
        },
    }
}