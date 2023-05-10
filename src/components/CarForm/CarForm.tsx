import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { chooseMake, chooseModel, choosePrice, chooseYear, chooseVin} from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface CarFormProps {
    id?:string;
    data?:{}
}

interface CarState {
    name: string;
    price: string;
}

export const CarForm = (props:CarFormProps) => {

    const dispatch = useDispatch();
    //let { CarData, getData } = useGetData();
    const store = useStore()
    const name = useSelector<CarState>(state => state.name)
    const { register, handleSubmit } = useForm({})

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if( props.id!){
            await serverCalls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseMake(data.make))

            dispatch(chooseModel(data.model))

            dispatch(choosePrice(data.price))

            dispatch(chooseYear(data.year))

            dispatch(chooseVin(data.vin))


            console.log(store.getState())

            await serverCalls.create(store.getState())

            window.location.reload()
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="make">Make</label>
                    <Input {...register('make')} name="make" placeholder='Make' />
                </div>
                <div>
                    <label htmlFor="model">Model</label>
                    <Input {...register('model')} name="model" placeholder="Model"/>
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <Input {...register('price')} name="price" placeholder="Price"/>
                </div>
                <div>
                    <label htmlFor="year">Year</label>
                    <Input {...register('year')} name="year" placeholder="Year"/>
                </div>
                <div>
                    <label htmlFor="vin">Vin</label>
                    <Input {...register('vin')} name="vin" placeholder="Vin"/>
                </div>
                
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}