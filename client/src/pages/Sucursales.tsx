import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonIcon,
  IonItem,
  IonLabel,
  IonSearchbar,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { arrowForwardOutline, storefrontOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSucursales } from '../actions/sucursalesActions';
import { fetchAuditorias } from '../actions/auditoriasActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import PageWrapper from '../components/PageWrapper';

const Sucursales: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error, sucursales } = useSelector(
    (state: any) => state.sucursales
  );
  const auditorias = useSelector((state: any) => state.auditorias);

  const [searchText, setSearchText] = useState<string>('');
  const [showApproved, setShowApproved] = useState<boolean>(true);
  const [showInCourse, setShowInCourse] = useState<boolean>(true);
  const [showUnapproved, setShowUnapproved] = useState<boolean>(true);
  const [showUnaudited, setShowUnaudited] = useState<boolean>(true);

  useEffect(() => {
    dispatch(fetchSucursales());
    dispatch(fetchAuditorias());
  }, [dispatch]);

  const getApprovedSucursales = (suc: any, au: any): [] => {
    return suc.filter((s: any) => {
      let ap = false;
      au.map((auditoria: any) => {
        if (auditoria.sucursal === s.id && auditoria.aprobada) ap = true;
      });
      return ap;
    });
  };
  const getUnapprovedSucursales = (suc: any, au: any): [] => {
    return suc.filter((s: any) => {
      let unap = false;
      au.map((auditoria: any) => {
        if (
          auditoria.sucursal === s.id &&
          !auditoria.aprobada &&
          auditoria.finalizada
        )
          unap = true;
      });
      return unap;
    });
  };
  const getInCourseSucursales = (suc: any, au: any): [] => {
    return suc.filter((s: any) => {
      let ic = false;
      au.map((auditoria: any) => {
        if (
          auditoria.sucursal === s.id &&
          !auditoria.aprobada &&
          !auditoria.finalizada
        )
          ic = true;
      });
      return ic;
    });
  };
  const getUnauditedSucursales = (suc: any, au: any): [] => {
    return suc.filter((s: any) => {
      let unaud = true;
      au.map((auditoria: any) => {
        if (auditoria.sucursal === s.id) unaud = false;
      });
      return unaud;
    });
  };

  return (
    <PageWrapper>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sucursales</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Sucursales</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonSearchbar
          placeholder="Busca una sucursal..."
          showCancelButton="focus"
          showClearButton="focus"
          value={searchText}
          onIonChange={(e) => setSearchText(e.detail.value!)}
        ></IonSearchbar>
        {}
        {loading || auditorias.loading ? (
          <Loader />
        ) : error ? (
          <Message color="danger">{error}</Message>
        ) : (
          <>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButton
                    style={{ width: '100%', margin: '0' }}
                    fill={showApproved ? 'solid' : 'outline'}
                    onClick={() => setShowApproved(!showApproved)}
                    color="secondary"
                  >
                    Aprobadas
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton
                    style={{ width: '100%', margin: '0' }}
                    fill={showUnapproved ? 'solid' : 'outline'}
                    onClick={() => setShowUnapproved(!showUnapproved)}
                    color="danger"
                  >
                    DESAPROBADAS
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton
                    style={{ width: '100%', margin: '0' }}
                    fill={showInCourse ? 'solid' : 'outline'}
                    onClick={() => setShowInCourse(!showInCourse)}
                    color="primary"
                  >
                    EN CURSO
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton
                    style={{ width: '100%', margin: '0' }}
                    fill={showUnaudited ? 'solid' : 'outline'}
                    onClick={() => setShowUnaudited(!showUnaudited)}
                    color="light"
                  >
                    SIN AUDITORIA
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonList>
              {showApproved &&
                getApprovedSucursales(sucursales, auditorias.auditorias)
                  .filter((s: any) =>
                    s.nombre
                      .toLowerCase()
                      .includes(searchText.toLocaleLowerCase())
                  )
                  .map((s: any) => (
                    <Link
                      key={s.id}
                      to={`/sucursal/${s.id}/perfil`}
                      style={{ textDecoration: 'none' }}
                    >
                      <IonItem button>
                        <IonIcon slot="start" icon={storefrontOutline} />
                        <IonLabel>{s.nombre}</IonLabel>
                        <IonIcon slot="end" icon={arrowForwardOutline} />
                      </IonItem>
                    </Link>
                  ))}
              {showUnapproved &&
                getUnapprovedSucursales(sucursales, auditorias.auditorias)
                  .filter((s: any) =>
                    s.nombre
                      .toLowerCase()
                      .includes(searchText.toLocaleLowerCase())
                  )
                  .map((s: any) => (
                    <Link
                      key={s.id}
                      to={`/sucursal/${s.id}/perfil`}
                      style={{ textDecoration: 'none' }}
                    >
                      <IonItem button>
                        <IonIcon slot="start" icon={storefrontOutline} />
                        <IonLabel>{s.nombre}</IonLabel>
                        <IonIcon slot="end" icon={arrowForwardOutline} />
                      </IonItem>
                    </Link>
                  ))}
              {showUnaudited &&
                getUnauditedSucursales(sucursales, auditorias.auditorias)
                  .filter((s: any) =>
                    s.nombre
                      .toLowerCase()
                      .includes(searchText.toLocaleLowerCase())
                  )
                  .map((s: any) => (
                    <Link
                      key={s.id}
                      to={`/sucursal/${s.id}/perfil`}
                      style={{ textDecoration: 'none' }}
                    >
                      <IonItem button>
                        <IonIcon slot="start" icon={storefrontOutline} />
                        <IonLabel>{s.nombre}</IonLabel>
                        <IonIcon slot="end" icon={arrowForwardOutline} />
                      </IonItem>
                    </Link>
                  ))}
              {showInCourse &&
                getInCourseSucursales(sucursales, auditorias.auditorias)
                  .filter((s: any) =>
                    s.nombre
                      .toLowerCase()
                      .includes(searchText.toLocaleLowerCase())
                  )
                  .map((s: any) => (
                    <Link
                      key={s.id}
                      to={`/sucursal/${s.id}/perfil`}
                      style={{ textDecoration: 'none' }}
                    >
                      <IonItem button>
                        <IonIcon slot="start" icon={storefrontOutline} />
                        <IonLabel>{s.nombre}</IonLabel>
                        <IonIcon slot="end" icon={arrowForwardOutline} />
                      </IonItem>
                    </Link>
                  ))}
            </IonList>
          </>
        )}
      </IonContent>
    </PageWrapper>
  );
};

export default Sucursales;
