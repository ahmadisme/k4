<?php
class Pengelolaan_Model extends CI_Model
{
    function bangunan_list()
    {
        $hasil = $this->db->query("SELECT * FROM tb_bangunan");
        return $hasil->result();
    }

    function bangunan_list_belum_bisa_proses()
    {
        $hasil = $this->db->query("SELECT * FROM tb_bangunan WHERE id_posisi_dokumen_aset=1");
        return $hasil->result();
    }

    function bangunan_list_proses()
    {
        $hasil = $this->db->query("SELECT * FROM tb_bangunan WHERE id_posisi_dokumen_aset=2 OR id_posisi_dokumen_aset=3 OR id_posisi_dokumen_aset=4 OR id_posisi_dokumen_aset=5 OR id_posisi_dokumen_aset=6 OR id_posisi_dokumen_aset=7 OR id_posisi_dokumen_aset=8 ");
        return $hasil->result();
    }
    function bangunan_list_bast()
    {
        $hasil = $this->db->query("SELECT * FROM tb_bangunan WHERE id_posisi_dokumen_aset=9 OR id_posisi_dokumen_aset=10 ");
        return $hasil->result();
    }

    function bangunan_list_tahun_anggaran()
    {
        $hasil = $this->db->query('SELECT tb,ta,
        sum(tb) AS total,
        sum(case when nama_posisi_dokumen_aset= "Belum bisa di proses Serah Terima Aset" then tb else 0 end) AS belum,
        sum(case when nama_posisi_dokumen_aset= "Kementerian Keuangan" OR nama_posisi_dokumen_aset = "Lengkap Dokumen Eksternal" OR nama_posisi_dokumen_aset = "Pengembalian Dari Setditjen ke Ditrusun" OR nama_posisi_dokumen_aset = "Proses di Setneg" OR nama_posisi_dokumen_aset = "Proses Pemberkasan ke Satker" OR nama_posisi_dokumen_aset = "Proses Pemberkasan ke Sekjen" OR nama_posisi_dokumen_aset = "Proses Pemberkasan ke Setditjen" then tb else 0 end) AS proses,
        sum(case when nama_posisi_dokumen_aset= "Proses Pembuatan BAST di Setditjen" OR nama_posisi_dokumen_aset = "Telah diterbitkan SK Penghapusan & BAST" then tb else 0 end) AS sudah_bast
        FROM tb_bangunan
        GROUP BY ta');
        return $hasil->result();
    }
}
