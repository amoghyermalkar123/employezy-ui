import { createBoard } from '@wixc3/react-board';
import AdminDash from '../../../pages/admin/AdminDash';

export default createBoard({
    name: 'AdminDash',
    Board: () => <AdminDash />,
    isSnippet: true,
});
