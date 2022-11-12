import { Col, Container, Row } from "react-bootstrap";
import classNames from "classnames/bind";

import { Image } from "components";
import styles from "../styles/AvatarBox.module.scss";

const cx = classNames.bind(styles);

function AvatarBox() {
  const avatars = [
    "https://robohash.org/quisuntquia.png?size=200x200&set=set1",
    "https://robohash.org/estcorporisminus.png?size=200x200&set=set1",
    "https://robohash.org/placeatducimusaut.png?size=200x200&set=set1",
    "https://robohash.org/recusandaeutet.png?size=200x200&set=set1",
    "https://robohash.org/quibusdametquis.png?size=200x200&set=set1",
    "https://robohash.org/adarchitectodolorum.png?size=200x200&set=set1",
    "https://robohash.org/etrecusandaequam.png?size=200x200&set=set1",
    "https://robohash.org/harumculpaut.png?size=200x200&set=set1",
    "https://robohash.org/possimusexercitationemaut.png?size=200x200&set=set1",
    "https://robohash.org/sequiautoccaecati.png?size=200x200&set=set1",

    "https://robohash.org/adipisciearumaut.png?size=200x200&set=set2",
    "https://robohash.org/aliasamaxime.png?size=200x200&set=set2",
    "https://robohash.org/numquamdoloremculpa.png?size=200x200&set=set2",
    "https://robohash.org/delenitiearumut.png?size=200x200&set=set2",
    "https://robohash.org/eummollitiaprovident.png?size=200x200&set=set2",
    "https://robohash.org/etsapientesunt.png?size=200x200&set=set2",
    "https://robohash.org/etenimest.png?size=200x200&set=set2",
    "https://robohash.org/voluptascummagnam.png?size=200x200&set=set2",
    "https://robohash.org/sitsimiliquelaborum.png?size=200x200&set=set2",
    "https://robohash.org/possimusvitaeet.png?size=200x200&set=set2",

    "https://robohash.org/adipisciearumaut.png?size=200x200&set=set3",
    "https://robohash.org/aliasamaxime.png?size=200x200&set=set3",
    "https://robohash.org/numquamdoloremculpa.png?size=200x200&set=set3",
    "https://robohash.org/delenitiearumut.png?size=200x200&set=set3",
    "https://robohash.org/eummollitiaprovident.png?size=200x200&set=set3",
    "https://robohash.org/etsapientesunt.png?size=200x200&set=set3",
    "https://robohash.org/etenimest.png?size=200x200&set=set3",
    "https://robohash.org/voluptascummagnam.png?size=200x200&set=set3",
    "https://robohash.org/sitsimiliquelaborum.png?size=200x200&set=set3",
    "https://robohash.org/possimusvitaeet.png?size=200x200&set=set3",

    "https://robohash.org/adipisciearumaut.png?size=200x200&set=set4",
    "https://robohash.org/aliasamaxime.png?size=200x200&set=set4",
    "https://robohash.org/numquamdoloremculpa.png?size=200x200&set=set4",
    "https://robohash.org/delenitiearumut.png?size=200x200&set=set4",
    "https://robohash.org/eummollitiaprovident.png?size=200x200&set=set4",
    "https://robohash.org/etsapientesunt.png?size=200x200&set=set4",
    "https://robohash.org/etenimest.png?size=200x200&set=set4",
    "https://robohash.org/voluptascummagnam.png?size=200x200&set=set4",
    "https://robohash.org/sitsimiliquelaborum.png?size=200x200&set=set4",
    "https://robohash.org/possimusvitaeet.png?size=200x200&set=set4",
  ];
  return (
    <Container>
      <Row className={cx("avatars-container")}>
        {avatars.map((avatar, index) => (
          <Col sm={20} key={index}>
            <Image
              src={avatar}
              alt={`Avatar ${index + 1}`}
              width={50}
              height={50}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AvatarBox;
