import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Card, Row, Col } from "react-bootstrap"
import ArtworkCard from "@/components/ArtworkCard";

export default function Favourites() {

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    if(!favouritesList) return null;

    return (
        <>
            <Row className="gy-4">
                {favouritesList.length > 0 ?
                    favouritesList.map((currentObjectID) => (
                        <Col lg={3} key={currentObjectID}>
                            <ArtworkCard objectID={currentObjectID} />
                        </Col>
                    )) :
                    <Card>
                        <Card.Body>
                            <h4>Nothing Here</h4>
                            <p>Try adding some new artwork to the list.</p>
                        </Card.Body>
                    </Card>
                }
            </Row>
        </>
    )
}
