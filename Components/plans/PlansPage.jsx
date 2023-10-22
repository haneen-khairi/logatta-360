import { CircularProgress } from '@nextui-org/react'
import React, { useState } from 'react'
import PlansCard from './PlansCard'

export default function PlansPage({
    plans,
    progress,
    onMarkPlansPage = () => { }
}) {
    return <div className='plans'>
        <div className="plans__progress">
            <CircularProgress
                aria-label="Loading..."
                size="lg"
                value={progress}
                color="success"
                showValueLabel={true}
            />
            <h4 className='plans__progress--text'>Status of plan completion</h4>
        </div>
        <div className="plans__cards">
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1" style={{gap: '64px'}}>
                <div className="plans__cards_section">
                    <h4 className='plans__cards_section--header'>Past Due <div className="badge past">{plans.filter((plan) => plan.status === '1')?.length}</div></h4>
                    <div className="grid grid-cols-1 gap-[16px]">
                    {plans.filter((plan) => plan.status === '1').map((plan)=> <PlansCard id={plan.id} key={plan.id} onMarkComplete={onMarkPlansPage} title={plan.name} text={plan.description}  type={'past'} date={plan.deadline}  /> )}
                    </div>
                </div>
                <div className="plans__cards_section">
                    <h4 className='plans__cards_section--header'>To Do <div className="badge to_do">{plans.filter((plan) => plan.status === '2')?.length}</div></h4>
                    <div className="grid grid-cols-1 gap-[16px]">
                    {plans.filter((plan) => plan.status === '2').map((plan)=> <PlansCard id={plan.id} key={plan.id} onMarkComplete={onMarkPlansPage} title={plan.name} text={plan.description}  type={'to_do'} date={plan.deadline}  /> )}
                    </div>
                </div>
                <div className="plans__cards_section">
                    <h4 className='plans__cards_section--header'>Done <div className="badge done">{plans.filter((plan) => plan.status === '3')?.length}</div></h4>
                    <div className="grid grid-cols-1 gap-[16px]">
                    {plans.filter((plan) => plan.status === '3').map((plan)=> <PlansCard key={plan.id} onMarkComplete={onMarkPlansPage} title={plan.name} text={plan.description}  type={'done'} date={plan.deadline}  /> )}
                    </div>
                </div>
            </div>
        </div>
    </div>
}
