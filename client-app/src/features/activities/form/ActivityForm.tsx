import { useEffect, useState } from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Activity } from '../../../app/models/activity';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { v4 as uuid } from 'uuid';
import { Formik } from 'formik';
import MySelectInput from './MySelectInput';
import MyTextArea from './MyTextArea';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { categoryOptions } from '../../../app/common/form/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import * as Yup from 'yup'

export default observer( function ActivityForm() {
    const {activityStore} = useStore();
    const { createActivity, updateActivity, loading, loadingInitial, loadActivity} = activityStore;
    const {id} = useParams();
    const navigate = useNavigate(); 
    
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    })

    const validationSchema = Yup.object({
        title: Yup.string().required('The event title is required'),
        category: Yup.string().required('The event category is required'),
        description: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    })

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])

    function handleFormSubmit(activity: Activity) {
        if(!activity.id) {
            activity.id = uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        } else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading Content...' />

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='Title' />
                        <MyTextArea rows={3} name='description' placeholder='Description' />
                        <MySelectInput options={categoryOptions} name='category' placeholder='Category' />
                        <MyDateInput name='date' 
                            placeholderText='Date' 
                            showTimeSelect 
                            timeCaption='time' 
                            dateFormat='MMMM d, yyyy h:mm aa' />
                        <Header content='Location Details' sub color='teal' />
                        <MyTextInput name='venue' placeholder='Venue' />
                        <MyTextInput name='city' placeholder='city' />
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} 
                            floated='right' 
                            positive 
                            type='submit' 
                            content='Submit' />
                        <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})