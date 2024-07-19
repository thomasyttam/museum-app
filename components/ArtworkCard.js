import useSWR from "swr";
import Error from "next/error";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";

export default function ArtworkCard({ objectID }) {

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

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
                        <Card.Img variant="top" src={data.primaryImageSmall ? data.primaryImageSmall : `https://via.placeholder.com/375x375.png?text=[+Not+Available+]`} />
                        <Card.Body>
                            <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
                            <Card.Text>
                                <strong>Date: </strong>{data.objectDate ? data.objectDate : "N/A"} <br />
                                <strong>Classification: </strong>{data.classification ? data.classification : "N/A"} <br />
                                <strong>Medium: </strong>{data.medium ? data.medium : "N/A"} <br /><br />
                            </Card.Text>
                            <Link href={`/artwork/${objectID}`} passHref>
                                <Button variant="outline-primary"><strong>ID: </strong>{objectID}</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </>
            )
        }
    }
}
