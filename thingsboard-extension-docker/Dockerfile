#
# Copyright © 2023 ThingsBoard, Inc.
#

ARG TB_EDITION

FROM ${TB_EDITION}

ARG EXTENSION_FOLDER
ARG PKG_NAME
ARG PKG_USER

RUN mkdir ${EXTENSION_FOLDER}

USER root

COPY ${PKG_NAME} ${EXTENSION_FOLDER}/

RUN chown -R ${PKG_USER}:${PKG_USER} ${EXTENSION_FOLDER}/*

RUN chmod 555 ${EXTENSION_FOLDER}/*

USER ${PKG_USER}

CMD ["start-tb-node.sh"]
