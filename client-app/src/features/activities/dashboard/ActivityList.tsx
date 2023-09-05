import { SyntheticEvent, useState } from 'react';
import { Segment, Item, Button, Label } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';


export default observer(function ActivityList() {
    const {activityStore} = useStore();
    const {activitiesByDate, deleteActivity, loading} = activityStore;

    const [target, setTarget] = useState('');
    

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }
    
    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(act => (
                    <Item key={act.id}>
                        <Item.Content>
                            <Item.Header as={'a'}>
                                {act.title}
                            </Item.Header>
                            <Item.Meta>{act.date}</Item.Meta>
                            <Item.Description>
                                <div>{act.description}</div>
                                <div>{act.city}, {act.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => activityStore.selectActivity(act.id)} floated='right' content='View' color='blue' />
                                <Button name={act.id} loading={loading && target === act.id} onClick={(e) => handleActivityDelete(e, act.id)} floated='right' content='delete' color='red' />

                                <Label content={act.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
});