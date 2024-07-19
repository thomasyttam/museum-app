import useSWR from "swr";
import Error from "next/error";
import { Card, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useEffect, useState } from "react";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";


export default function ArtworkCardDetail({ objectID }) {

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);

    useEffect(()=>{
        setShowAdded(favouritesList?.includes(objectID))
    }, [favouritesList])
    

    const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);

    async function favouritesClicked() {
        if(showAdded){
            setFavouritesList(await removeFromFavourites(objectID));
        }
        else{
            setFavouritesList(await addToFavourites(objectID));
        }
        setShowAdded(!showAdded);
    }

    if (error) {
        return <Error statusCode={404} />
    }

    else {
        if (!data) {
            return null;
        }
        else {
            return (
                <>
                    <Card>
                        {data.primaryImage ?
                            <Card.Img variant="top" src={data.primaryImage}></Card.Img> : null
                        }
                        <Card.Body>
                            <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
                            <Card.Text>
                                <strong>Date: </strong>{data.objectDate ? data.objectDate : "N/A"} <br />
                                <strong>Classification: </strong>{data.classification ? data.classification : "N/A"} <br />
                                <strong>Medium: </strong>{data.medium ? data.medium : "N/A"} <br /><br />
                                <strong>Artist: </strong>{data.artistDisplayName ? <> {data.artistDisplayName} ( <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a> )</> : "N/A"} <br />
                                <strong>Credit Line: </strong>{data.creditLine ? data.creditLine : "N/A"} <br />
                                <strong>Dimensions: </strong>{data.dimensions ? data.dimensions : "N/A"} <br /><br />
                                <Button variant = {showAdded ? "primary" : "outline-primary"} onClick={favouritesClicked}>{showAdded ? `+ Favourite (added)`: `+ Favourite`}</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </>
            )
        }
    }
}
//