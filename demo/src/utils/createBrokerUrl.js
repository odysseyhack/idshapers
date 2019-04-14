import shortId from "shortid";

import BROKER_URL from "../constants/pullerUrl";

export default (id=shortId.generate()) =>
  `${BROKER_URL}topic/${id}`;
