/*==============================================================*/
/* DBMS name:      PostgreSQL 8                                 */
/* Created on:     17/4/2022 21:50:10                           */
/*==============================================================*/


drop index AREA_PK;

drop table AREA;

drop index PROGRAMA__FK;

drop index SE_PROGRAMA_EN_FK;

drop index SE_REALIZA_FK;

drop index CHEQUEO_PK;

drop table CHEQUEO;

drop index TIENE_UN_FK;

drop index CONTACTOEMERGENCIA_PK;

drop table CONTACTOEMERGENCIA;

drop index DEPARTAMENTO_PK;

drop table DEPARTAMENTO;

drop index SE_DETALLA_EN_FK;

drop index DETALLECHEQUEO_PK;

drop table DETALLECHEQUEO;

drop index DETALLEEXAMEN2_FK;

drop index DETALLEEXAMEN_FK;

drop index DETALLEEXAMEN_PK;

drop table DETALLEEXAMEN;

drop index DETALLEORDEN2_FK;

drop index DETALLEORDEN_FK;

drop index DETALLEORDEN_PK;

drop table DETALLEORDEN;

drop index DETALLEROL2_FK;

drop index DETALLEROL_FK;

drop index DETALLEROL_PK;

drop table DETALLEROL;

drop index ESTADOCIVIL_PK;

drop table ESTADOCIVIL;

drop index DEFINE_FK;

drop index EXAMEN_PK;

drop table EXAMEN;

drop index SE_DIVIDE_EN_FK;

drop index TIENE_UNA_FK;

drop index ES_DETERMINADO_FK;

drop index INTERVALO_PK;

drop table INTERVALO;

drop index SE_ENCUENTRA_EN_FK;

drop index LABORATORIO_PK;

drop table LABORATORIO;

drop index ES_UN_FK;

drop index EJERCE_FK;

drop index LABORATORISTA_PK;

drop table LABORATORISTA;

drop index CONFORMAN_FK;

drop index MUNICIPIO_PK;

drop table MUNICIPIO;

drop index CONTACTO_FK;

drop index NUMEROTELEFONO_PK;

drop table NUMEROTELEFONO;

drop index POSEE_FK;

drop index OPCION_PK;

drop table OPCION;

drop index OPCIONPERMISO_PK;

drop table OPCIONPERMISO;

drop index TIENE_FK;

drop index PERTENECE_A_FK;

drop index PACIENTE_PK;

drop table PACIENTE;

drop index SE_DESCRIBE_CON_FK;

drop index ESTABLECE_FK;

drop index PARAMETRO_PK;

drop table PARAMETRO;

drop index PERMISO2_FK;

drop index PERMISO_FK;

drop index PERMISO_PK;

drop table PERMISO;

drop index POBLACION_PK;

drop table POBLACION;

drop index PROFESION_PK;

drop table PROFESION;

drop index ROL_PK;

drop table ROL;

drop index UNIDAD_PK;

drop table UNIDAD;

drop index TRABAJA_EN_FK;

drop index USUARIO_PK;

drop table USUARIO;

/*==============================================================*/
/* Table: AREA                                                  */
/*==============================================================*/
create table AREA (
   IDAREA               SERIAL               not null,
   NOMBREAREA           VARCHAR(200)         not null,
   constraint PK_AREA primary key (IDAREA)
);

/*==============================================================*/
/* Index: AREA_PK                                               */
/*==============================================================*/
create unique index AREA_PK on AREA (
IDAREA
);

/*==============================================================*/
/* Table: CHEQUEO                                               */
/*==============================================================*/
create table CHEQUEO (
   IDCHEQUEO            SERIAL               not null,
   IDPACIENTE           INT4                 null,
   IDUSUARIO            INT4                 null,
   IDLABORATORIO        INT4                 null,
   FECHACHEQUEO         DATE                 not null,
   HORACHEQUEO          TIME                 not null,
   ARCHIVO              VARCHAR(300)         not null,
   constraint PK_CHEQUEO primary key (IDCHEQUEO)
);

/*==============================================================*/
/* Index: CHEQUEO_PK                                            */
/*==============================================================*/
create unique index CHEQUEO_PK on CHEQUEO (
IDCHEQUEO
);

/*==============================================================*/
/* Index: SE_REALIZA_FK                                         */
/*==============================================================*/
create  index SE_REALIZA_FK on CHEQUEO (
IDPACIENTE
);

/*==============================================================*/
/* Index: SE_PROGRAMA_EN_FK                                     */
/*==============================================================*/
create  index SE_PROGRAMA_EN_FK on CHEQUEO (
IDLABORATORIO
);

/*==============================================================*/
/* Index: PROGRAMA__FK                                          */
/*==============================================================*/
create  index PROGRAMA__FK on CHEQUEO (
IDUSUARIO
);

/*==============================================================*/
/* Table: CONTACTOEMERGENCIA                                    */
/*==============================================================*/
create table CONTACTOEMERGENCIA (
   IDCONTACTO           SERIAL               not null,
   IDPACIENTE           INT4                 null,
   TELEFONO             VARCHAR(200)         not null,
   NOMBRECONTACTO       VARCHAR(200)         not null,
   constraint PK_CONTACTOEMERGENCIA primary key (IDCONTACTO)
);

/*==============================================================*/
/* Index: CONTACTOEMERGENCIA_PK                                 */
/*==============================================================*/
create unique index CONTACTOEMERGENCIA_PK on CONTACTOEMERGENCIA (
IDCONTACTO
);

/*==============================================================*/
/* Index: TIENE_UN_FK                                           */
/*==============================================================*/
create  index TIENE_UN_FK on CONTACTOEMERGENCIA (
IDPACIENTE
);

/*==============================================================*/
/* Table: DEPARTAMENTO                                          */
/*==============================================================*/
create table DEPARTAMENTO (
   IDDEPARTAMENTO       SERIAL               not null,
   DEPARTAMENTO         VARCHAR(200)         not null,
   constraint PK_DEPARTAMENTO primary key (IDDEPARTAMENTO)
);

/*==============================================================*/
/* Index: DEPARTAMENTO_PK                                       */
/*==============================================================*/
create unique index DEPARTAMENTO_PK on DEPARTAMENTO (
IDDEPARTAMENTO
);

/*==============================================================*/
/* Table: DETALLECHEQUEO                                        */
/*==============================================================*/
create table DETALLECHEQUEO (
   IDDETALLE            SERIAL               not null,
   IDCHEQUEO            INT4                 null,
   VALORCHEQUEO         NUMERIC(8,2)         not null,
   POSITIVOCHEQUEO      BOOL                 not null,
   COMENTARIOCHEQUEO    VARCHAR(200)         not null,
   PRESENCIA            INT2                 not null,
   constraint PK_DETALLECHEQUEO primary key (IDDETALLE)
);

/*==============================================================*/
/* Index: DETALLECHEQUEO_PK                                     */
/*==============================================================*/
create unique index DETALLECHEQUEO_PK on DETALLECHEQUEO (
IDDETALLE
);

/*==============================================================*/
/* Index: SE_DETALLA_EN_FK                                      */
/*==============================================================*/
create  index SE_DETALLA_EN_FK on DETALLECHEQUEO (
IDCHEQUEO
);

/*==============================================================*/
/* Table: DETALLEEXAMEN                                         */
/*==============================================================*/
create table DETALLEEXAMEN (
   IDPARAMETRO          INT4                 not null,
   IDEXAMEN             INT4                 not null,
   constraint PK_DETALLEEXAMEN primary key (IDPARAMETRO, IDEXAMEN)
);

/*==============================================================*/
/* Index: DETALLEEXAMEN_PK                                      */
/*==============================================================*/
create unique index DETALLEEXAMEN_PK on DETALLEEXAMEN (
IDPARAMETRO,
IDEXAMEN
);

/*==============================================================*/
/* Index: DETALLEEXAMEN_FK                                      */
/*==============================================================*/
create  index DETALLEEXAMEN_FK on DETALLEEXAMEN (
IDPARAMETRO
);

/*==============================================================*/
/* Index: DETALLEEXAMEN2_FK                                     */
/*==============================================================*/
create  index DETALLEEXAMEN2_FK on DETALLEEXAMEN (
IDEXAMEN
);

/*==============================================================*/
/* Table: DETALLEORDEN                                          */
/*==============================================================*/
create table DETALLEORDEN (
   IDEXAMEN             INT4                 not null,
   IDCHEQUEO            INT4                 not null,
   constraint PK_DETALLEORDEN primary key (IDEXAMEN, IDCHEQUEO)
);

/*==============================================================*/
/* Index: DETALLEORDEN_PK                                       */
/*==============================================================*/
create unique index DETALLEORDEN_PK on DETALLEORDEN (
IDEXAMEN,
IDCHEQUEO
);

/*==============================================================*/
/* Index: DETALLEORDEN_FK                                       */
/*==============================================================*/
create  index DETALLEORDEN_FK on DETALLEORDEN (
IDEXAMEN
);

/*==============================================================*/
/* Index: DETALLEORDEN2_FK                                      */
/*==============================================================*/
create  index DETALLEORDEN2_FK on DETALLEORDEN (
IDCHEQUEO
);

/*==============================================================*/
/* Table: DETALLEROL                                            */
/*==============================================================*/
create table DETALLEROL (
   IDROL                INT4                 not null,
   IDUSUARIO            INT4                 not null,
   constraint PK_DETALLEROL primary key (IDROL, IDUSUARIO)
);

/*==============================================================*/
/* Index: DETALLEROL_PK                                         */
/*==============================================================*/
create unique index DETALLEROL_PK on DETALLEROL (
IDROL,
IDUSUARIO
);

/*==============================================================*/
/* Index: DETALLEROL_FK                                         */
/*==============================================================*/
create  index DETALLEROL_FK on DETALLEROL (
IDROL
);

/*==============================================================*/
/* Index: DETALLEROL2_FK                                        */
/*==============================================================*/
create  index DETALLEROL2_FK on DETALLEROL (
IDUSUARIO
);

/*==============================================================*/
/* Table: ESTADOCIVIL                                           */
/*==============================================================*/
create table ESTADOCIVIL (
   IDESTADO             SERIAL               not null,
   ESTADOCIVIL          VARCHAR(200)         not null,
   constraint PK_ESTADOCIVIL primary key (IDESTADO)
);

/*==============================================================*/
/* Index: ESTADOCIVIL_PK                                        */
/*==============================================================*/
create unique index ESTADOCIVIL_PK on ESTADOCIVIL (
IDESTADO
);

/*==============================================================*/
/* Table: EXAMEN                                                */
/*==============================================================*/
create table EXAMEN (
   IDEXAMEN             SERIAL               not null,
   IDAREA               INT4                 null,
   NOMBREEXAMEN         VARCHAR(200)         not null,
   constraint PK_EXAMEN primary key (IDEXAMEN)
);

/*==============================================================*/
/* Index: EXAMEN_PK                                             */
/*==============================================================*/
create unique index EXAMEN_PK on EXAMEN (
IDEXAMEN
);

/*==============================================================*/
/* Index: DEFINE_FK                                             */
/*==============================================================*/
create  index DEFINE_FK on EXAMEN (
IDAREA
);

/*==============================================================*/
/* Table: INTERVALO                                             */
/*==============================================================*/
create table INTERVALO (
   IDINTERVALO          SERIAL               not null,
   IDPARAMETRO          INT4                 null,
   IDUNIDAD             INT4                 null,
   IDPOBLACION          INT4                 null,
   COMENTARIOPOSITIVO   VARCHAR(50)          not null,
   COMENTARIONEGATIVO   VARCHAR(200)         not null,
   VALORMAXIMO          DECIMAL(4,2)         not null,
   VALORMINIMO          DECIMAL(4,2)         not null,
   constraint PK_INTERVALO primary key (IDINTERVALO)
);

/*==============================================================*/
/* Index: INTERVALO_PK                                          */
/*==============================================================*/
create unique index INTERVALO_PK on INTERVALO (
IDINTERVALO
);

/*==============================================================*/
/* Index: ES_DETERMINADO_FK                                     */
/*==============================================================*/
create  index ES_DETERMINADO_FK on INTERVALO (
IDPARAMETRO
);

/*==============================================================*/
/* Index: TIENE_UNA_FK                                          */
/*==============================================================*/
create  index TIENE_UNA_FK on INTERVALO (
IDUNIDAD
);

/*==============================================================*/
/* Index: SE_DIVIDE_EN_FK                                       */
/*==============================================================*/
create  index SE_DIVIDE_EN_FK on INTERVALO (
IDPOBLACION
);

/*==============================================================*/
/* Table: LABORATORIO                                           */
/*==============================================================*/
create table LABORATORIO (
   IDLABORATORIO        SERIAL               not null,
   IDMUNICIPIO          INT4                 null,
   NOMBRELABORATORIO    VARCHAR(200)         not null,
   constraint PK_LABORATORIO primary key (IDLABORATORIO)
);

/*==============================================================*/
/* Index: LABORATORIO_PK                                        */
/*==============================================================*/
create unique index LABORATORIO_PK on LABORATORIO (
IDLABORATORIO
);

/*==============================================================*/
/* Index: SE_ENCUENTRA_EN_FK                                    */
/*==============================================================*/
create  index SE_ENCUENTRA_EN_FK on LABORATORIO (
IDMUNICIPIO
);

/*==============================================================*/
/* Table: LABORATORISTA                                         */
/*==============================================================*/
create table LABORATORISTA (
   IDLABORATORISTA      SERIAL               not null,
   IDPROFESION          INT4                 null,
   IDUSUARIO            INT4                 null,
   NUMEROJUNTAVIGILACIA INT4                 not null,
   constraint PK_LABORATORISTA primary key (IDLABORATORISTA)
);

/*==============================================================*/
/* Index: LABORATORISTA_PK                                      */
/*==============================================================*/
create unique index LABORATORISTA_PK on LABORATORISTA (
IDLABORATORISTA
);

/*==============================================================*/
/* Index: EJERCE_FK                                             */
/*==============================================================*/
create  index EJERCE_FK on LABORATORISTA (
IDPROFESION
);

/*==============================================================*/
/* Index: ES_UN_FK                                              */
/*==============================================================*/
create  index ES_UN_FK on LABORATORISTA (
IDUSUARIO
);

/*==============================================================*/
/* Table: MUNICIPIO                                             */
/*==============================================================*/
create table MUNICIPIO (
   IDMUNICIPIO          SERIAL               not null,
   IDDEPARTAMENTO       INT4                 null,
   MUNICIPIO            VARCHAR(200)         not null,
   constraint PK_MUNICIPIO primary key (IDMUNICIPIO)
);

/*==============================================================*/
/* Index: MUNICIPIO_PK                                          */
/*==============================================================*/
create unique index MUNICIPIO_PK on MUNICIPIO (
IDMUNICIPIO
);

/*==============================================================*/
/* Index: CONFORMAN_FK                                          */
/*==============================================================*/
create  index CONFORMAN_FK on MUNICIPIO (
IDDEPARTAMENTO
);

/*==============================================================*/
/* Table: NUMEROTELEFONO                                        */
/*==============================================================*/
create table NUMEROTELEFONO (
   IDNUMERO             SERIAL               not null,
   IDPACIENTE           INT4                 null,
   NUMERO               VARCHAR(100)         not null,
   NOMBREIDENTIFICADOR  VARCHAR(200)         not null,
   constraint PK_NUMEROTELEFONO primary key (IDNUMERO)
);

/*==============================================================*/
/* Index: NUMEROTELEFONO_PK                                     */
/*==============================================================*/
create unique index NUMEROTELEFONO_PK on NUMEROTELEFONO (
IDNUMERO
);

/*==============================================================*/
/* Index: CONTACTO_FK                                           */
/*==============================================================*/
create  index CONTACTO_FK on NUMEROTELEFONO (
IDPACIENTE
);

/*==============================================================*/
/* Table: OPCION                                                */
/*==============================================================*/
create table OPCION (
   IDOPCION             SERIAL               not null,
   IDPARAMETRO          INT4                 null,
   OPCION               VARCHAR(200)         not null,
   REFERENCIA           BOOL                 not null,
   constraint PK_OPCION primary key (IDOPCION)
);

/*==============================================================*/
/* Index: OPCION_PK                                             */
/*==============================================================*/
create unique index OPCION_PK on OPCION (
IDOPCION
);

/*==============================================================*/
/* Index: POSEE_FK                                              */
/*==============================================================*/
create  index POSEE_FK on OPCION (
IDPARAMETRO
);

/*==============================================================*/
/* Table: OPCIONPERMISO                                         */
/*==============================================================*/
create table OPCIONPERMISO (
   IDOPCIONPERMISO      SERIAL               not null,
   ACCION               VARCHAR(200)         not null,
   constraint PK_OPCIONPERMISO primary key (IDOPCIONPERMISO)
);

/*==============================================================*/
/* Index: OPCIONPERMISO_PK                                      */
/*==============================================================*/
create unique index OPCIONPERMISO_PK on OPCIONPERMISO (
IDOPCIONPERMISO
);

/*==============================================================*/
/* Table: PACIENTE                                              */
/*==============================================================*/
create table PACIENTE (
   IDPACIENTE           SERIAL               not null,
   IDESTADO             INT4                 null,
   IDMUNICIPIO          INT4                 null,
   APELLIDO             VARCHAR(200)         not null,
   DIRECCION            VARCHAR(200)         not null,
   FECHANACIMIENTO      DATE                 not null,
   CORREOPACIENTE       VARCHAR(200)         not null,
   NOMBREPACIENTE       VARCHAR(200)         not null,
   constraint PK_PACIENTE primary key (IDPACIENTE)
);

/*==============================================================*/
/* Index: PACIENTE_PK                                           */
/*==============================================================*/
create unique index PACIENTE_PK on PACIENTE (
IDPACIENTE
);

/*==============================================================*/
/* Index: PERTENECE_A_FK                                        */
/*==============================================================*/
create  index PERTENECE_A_FK on PACIENTE (
IDMUNICIPIO
);

/*==============================================================*/
/* Index: TIENE_FK                                              */
/*==============================================================*/
create  index TIENE_FK on PACIENTE (
IDESTADO
);

/*==============================================================*/
/* Table: PARAMETRO                                             */
/*==============================================================*/
create table PARAMETRO (
   IDPARAMETRO          SERIAL               not null,
   IDAREA               INT4                 null,
   IDDETALLE            INT4                 null,
   PARAMETRO            VARCHAR(200)         not null,
   TIPO                 NUMERIC(2)           not null,
   constraint PK_PARAMETRO primary key (IDPARAMETRO)
);

/*==============================================================*/
/* Index: PARAMETRO_PK                                          */
/*==============================================================*/
create unique index PARAMETRO_PK on PARAMETRO (
IDPARAMETRO
);

/*==============================================================*/
/* Index: ESTABLECE_FK                                          */
/*==============================================================*/
create  index ESTABLECE_FK on PARAMETRO (
IDAREA
);

/*==============================================================*/
/* Index: SE_DESCRIBE_CON_FK                                    */
/*==============================================================*/
create  index SE_DESCRIBE_CON_FK on PARAMETRO (
IDDETALLE
);

/*==============================================================*/
/* Table: PERMISO                                               */
/*==============================================================*/
create table PERMISO (
   IDROL                INT4                 not null,
   IDOPCIONPERMISO      INT4                 not null,
   constraint PK_PERMISO primary key (IDROL, IDOPCIONPERMISO)
);

/*==============================================================*/
/* Index: PERMISO_PK                                            */
/*==============================================================*/
create unique index PERMISO_PK on PERMISO (
IDROL,
IDOPCIONPERMISO
);

/*==============================================================*/
/* Index: PERMISO_FK                                            */
/*==============================================================*/
create  index PERMISO_FK on PERMISO (
IDROL
);

/*==============================================================*/
/* Index: PERMISO2_FK                                           */
/*==============================================================*/
create  index PERMISO2_FK on PERMISO (
IDOPCIONPERMISO
);

/*==============================================================*/
/* Table: POBLACION                                             */
/*==============================================================*/
create table POBLACION (
   IDPOBLACION          SERIAL               not null,
   EDADMINIMO           NUMERIC(3)           not null,
   EDADMAXIMO           NUMERIC(3)           not null,
   POBLACION            VARCHAR(200)         not null,
   constraint PK_POBLACION primary key (IDPOBLACION)
);

/*==============================================================*/
/* Index: POBLACION_PK                                          */
/*==============================================================*/
create unique index POBLACION_PK on POBLACION (
IDPOBLACION
);

/*==============================================================*/
/* Table: PROFESION                                             */
/*==============================================================*/
create table PROFESION (
   IDPROFESION          SERIAL               not null,
   NOMBREPROFESION      VARCHAR(200)         not null,
   constraint PK_PROFESION primary key (IDPROFESION)
);

/*==============================================================*/
/* Index: PROFESION_PK                                          */
/*==============================================================*/
create unique index PROFESION_PK on PROFESION (
IDPROFESION
);

/*==============================================================*/
/* Table: ROL                                                   */
/*==============================================================*/
create table ROL (
   IDROL                SERIAL               not null,
   NOMBREROL            VARCHAR(200)         not null,
   constraint PK_ROL primary key (IDROL)
);

/*==============================================================*/
/* Index: ROL_PK                                                */
/*==============================================================*/
create unique index ROL_PK on ROL (
IDROL
);

/*==============================================================*/
/* Table: UNIDAD                                                */
/*==============================================================*/
create table UNIDAD (
   IDUNIDAD             SERIAL               not null,
   NOMBREUNIDAD         VARCHAR(200)         not null,
   SIMBOLO              VARCHAR(10)          null,
   constraint PK_UNIDAD primary key (IDUNIDAD)
);

/*==============================================================*/
/* Index: UNIDAD_PK                                             */
/*==============================================================*/
create unique index UNIDAD_PK on UNIDAD (
IDUNIDAD
);

/*==============================================================*/
/* Table: USUARIO                                               */
/*==============================================================*/
create table USUARIO (
   IDUSUARIO            SERIAL               not null,
   IDLABORATORIO        INT4                 null,
   CONTRASENIA          VARCHAR(300)         not null,
   ESTADO               BOOL                 not null,
   NOMBREUSUARIO        VARCHAR(200)         not null,
   CORREOUSUARIO        VARCHAR(200)         not null,
   constraint PK_USUARIO primary key (IDUSUARIO)
);

/*==============================================================*/
/* Index: USUARIO_PK                                            */
/*==============================================================*/
create unique index USUARIO_PK on USUARIO (
IDUSUARIO
);

/*==============================================================*/
/* Index: TRABAJA_EN_FK                                         */
/*==============================================================*/
create  index TRABAJA_EN_FK on USUARIO (
IDLABORATORIO
);

alter table CHEQUEO
   add constraint FK_CHEQUEO_PROGRAMA__USUARIO foreign key (IDUSUARIO)
      references USUARIO (IDUSUARIO)
      on delete restrict on update restrict;

alter table CHEQUEO
   add constraint FK_CHEQUEO_SE_PROGRA_LABORATO foreign key (IDLABORATORIO)
      references LABORATORIO (IDLABORATORIO)
      on delete restrict on update restrict;

alter table CHEQUEO
   add constraint FK_CHEQUEO_SE_REALIZ_PACIENTE foreign key (IDPACIENTE)
      references PACIENTE (IDPACIENTE)
      on delete restrict on update restrict;

alter table CONTACTOEMERGENCIA
   add constraint FK_CONTACTO_TIENE_UN_PACIENTE foreign key (IDPACIENTE)
      references PACIENTE (IDPACIENTE)
      on delete restrict on update restrict;

alter table DETALLECHEQUEO
   add constraint FK_DETALLEC_SE_DETALL_CHEQUEO foreign key (IDCHEQUEO)
      references CHEQUEO (IDCHEQUEO)
      on delete restrict on update restrict;

alter table DETALLEEXAMEN
   add constraint FK_DETALLEE_DETALLEEX_PARAMETR foreign key (IDPARAMETRO)
      references PARAMETRO (IDPARAMETRO)
      on delete restrict on update restrict;

alter table DETALLEEXAMEN
   add constraint FK_DETALLEE_DETALLEEX_EXAMEN foreign key (IDEXAMEN)
      references EXAMEN (IDEXAMEN)
      on delete restrict on update restrict;

alter table DETALLEORDEN
   add constraint FK_DETALLEO_DETALLEOR_EXAMEN foreign key (IDEXAMEN)
      references EXAMEN (IDEXAMEN)
      on delete restrict on update restrict;

alter table DETALLEORDEN
   add constraint FK_DETALLEO_DETALLEOR_CHEQUEO foreign key (IDCHEQUEO)
      references CHEQUEO (IDCHEQUEO)
      on delete restrict on update restrict;

alter table DETALLEROL
   add constraint FK_DETALLER_DETALLERO_ROL foreign key (IDROL)
      references ROL (IDROL)
      on delete restrict on update restrict;

alter table DETALLEROL
   add constraint FK_DETALLER_DETALLERO_USUARIO foreign key (IDUSUARIO)
      references USUARIO (IDUSUARIO)
      on delete restrict on update restrict;

alter table EXAMEN
   add constraint FK_EXAMEN_DEFINE_AREA foreign key (IDAREA)
      references AREA (IDAREA)
      on delete restrict on update restrict;

alter table INTERVALO
   add constraint FK_INTERVAL_ES_DETERM_PARAMETR foreign key (IDPARAMETRO)
      references PARAMETRO (IDPARAMETRO)
      on delete restrict on update restrict;

alter table INTERVALO
   add constraint FK_INTERVAL_SE_DIVIDE_POBLACIO foreign key (IDPOBLACION)
      references POBLACION (IDPOBLACION)
      on delete restrict on update restrict;

alter table INTERVALO
   add constraint FK_INTERVAL_TIENE_UNA_UNIDAD foreign key (IDUNIDAD)
      references UNIDAD (IDUNIDAD)
      on delete restrict on update restrict;

alter table LABORATORIO
   add constraint FK_LABORATO_SE_ENCUEN_MUNICIPI foreign key (IDMUNICIPIO)
      references MUNICIPIO (IDMUNICIPIO)
      on delete restrict on update restrict;

alter table LABORATORISTA
   add constraint FK_LABORATO_EJERCE_PROFESIO foreign key (IDPROFESION)
      references PROFESION (IDPROFESION)
      on delete restrict on update restrict;

alter table LABORATORISTA
   add constraint FK_LABORATO_ES_UN_USUARIO foreign key (IDUSUARIO)
      references USUARIO (IDUSUARIO)
      on delete restrict on update restrict;

alter table MUNICIPIO
   add constraint FK_MUNICIPI_CONFORMAN_DEPARTAM foreign key (IDDEPARTAMENTO)
      references DEPARTAMENTO (IDDEPARTAMENTO)
      on delete restrict on update restrict;

alter table NUMEROTELEFONO
   add constraint FK_NUMEROTE_CONTACTO_PACIENTE foreign key (IDPACIENTE)
      references PACIENTE (IDPACIENTE)
      on delete restrict on update restrict;

alter table OPCION
   add constraint FK_OPCION_POSEE_PARAMETR foreign key (IDPARAMETRO)
      references PARAMETRO (IDPARAMETRO)
      on delete restrict on update restrict;

alter table PACIENTE
   add constraint FK_PACIENTE_PERTENECE_MUNICIPI foreign key (IDMUNICIPIO)
      references MUNICIPIO (IDMUNICIPIO)
      on delete restrict on update restrict;

alter table PACIENTE
   add constraint FK_PACIENTE_TIENE_ESTADOCI foreign key (IDESTADO)
      references ESTADOCIVIL (IDESTADO)
      on delete restrict on update restrict;

alter table PARAMETRO
   add constraint FK_PARAMETR_ESTABLECE_AREA foreign key (IDAREA)
      references AREA (IDAREA)
      on delete restrict on update restrict;

alter table PARAMETRO
   add constraint FK_PARAMETR_SE_DESCRI_DETALLEC foreign key (IDDETALLE)
      references DETALLECHEQUEO (IDDETALLE)
      on delete restrict on update restrict;

alter table PERMISO
   add constraint FK_PERMISO_PERMISO_ROL foreign key (IDROL)
      references ROL (IDROL)
      on delete restrict on update restrict;

alter table PERMISO
   add constraint FK_PERMISO_PERMISO2_OPCIONPE foreign key (IDOPCIONPERMISO)
      references OPCIONPERMISO (IDOPCIONPERMISO)
      on delete restrict on update restrict;

alter table USUARIO
   add constraint FK_USUARIO_TRABAJA_E_LABORATO foreign key (IDLABORATORIO)
      references LABORATORIO (IDLABORATORIO)
      on delete restrict on update restrict;

