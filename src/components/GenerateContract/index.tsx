import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';
// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    color: 'black',
  },
  signatureBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30
  },
  signatureItem: {
    margin: 10,
  },

  section: {
    margin: 30,
    padding: 10,
  },
  viewer: {
    width: typeof window === 'undefined' ? 0 : window?.innerWidth, //the pdf viewer will take up all of the width and height
    height: typeof window === 'undefined' ? 0 : window?.innerHeight,
  },
});

// Create Document Component
function BasicDocument({
    userFullname,
    userAddress,
    userCISeries,
    userCINumber,
    userCIDate,
    userCIInstitute,
    userCNP,
    companyFullName,
    companyFullAddress,
    companyNumber,
    companyCUI,
    companyRepresentative,
    jobTitle,
    paidSum
}) {
  if (typeof window === 'undefined') {
    return null;
  }
  return (
    <PDFViewer style={styles.viewer}>
      {/* Start of the document*/}
      <Document>
        {/*render a single page*/}
        <Page size='A4' style={styles.page}>
          <View style={styles.section}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 600,
                fontSize: '12px',
              }}
            >
              CONTRACT DE CESIUNE A <br />
            </Text>
            <Text
              style={{ textAlign: 'center', fontWeight: 600, fontSize: '12px' }}
            >
              DREPTURILOR DE AUTOR
            </Text>
          </View>
          <View style={styles.section}>
            <Text
              style={{ textAlign: 'left', fontWeight: 600, fontSize: '10px' }}
            >
              1. Intre {companyFullName}, cu
              sediul in {companyFullAddress}, cod fiscal {companyCUI + ' '}
               reprezentata prin {companyRepresentative}, avand functia de
              Administrator, in calitate de cesionar, si
              {userFullname}, domiciliat in {userAddress} C.I: seria {userCISeries}.nr.{userCINumber} eliberata de
              {userCIInstitute} la {userCIDate}. CNP {userCNP} in
              calitate de autor-cedent, s-a incheiat prezentul contract de
              cesiune a drepturilor de autor.
            </Text>
          </View>
          <View style={styles.section}>
            <Text
              style={{ textAlign: 'left', fontWeight: 600, fontSize: '10px' }}
            >
              2. Obiectul prezentului contract il reprezinta conceperea si
              prezentarea
              {' ' + jobTitle}.(conferinte,
              cursuri universitare, pledoarii, programe de calculator,
              comunicari, studii, proiecte si documentatii stiintifice,
              traduceri, adaptari, adnotari, lucrari documentare care reprezinta
              o munca intelectuala de creatie, compilatii de materiale si date,
              protejate ori nu, inclusiv baze de date, care prin alegerea sau
              dispunerea materialului constituie creatii intelectuale),
              activitati desfasurate de autor la cesionar in conformitate cu
              prevederile L8/1996, privind dreptul de autor si drepturile
              conexe, cu modificarile si completarile ulterioare.
            </Text>
          </View>
          <View style={styles.section}>
            <Text
              style={{ textAlign: 'left', fontWeight: 600, fontSize: '10px' }}
            >
              3. Termenul (perioada) prezentarii creatiei
              intelectuale…………………………………..
            </Text>
          </View>
          <View style={styles.section}>
            <Text
              style={{ textAlign: 'left', fontWeight: 600, fontSize: '10px' }}
            >
              4. Locul prezentarii creatiei stiintifice: sediul cesionarului.
            </Text>
          </View>
          <View style={styles.section}>
            <Text
              style={{ textAlign: 'left', fontWeight: 600, fontSize: '10px' }}
            >
              5. Cesionarul a platit autorului-cedent, suma de {paidSum} lei, cu titlu de remuneratie.
              Suma reprezinta venit brut, la care cesionarul va retine si varsa
              la bugetul public national plata anticipata din impozitul pe
              venit, respective 10%, precum si orice alte impozite, taxe si
              contributii pentru orice buget sau fond public, care se retin prin
              stopaj la sursa, platind autorului cedent venitul net rezultat.
              Raspunderea pentru calcularea, retinerea si virarea acestor sume
              revine exclusiv cesionarului. Plata se face in contul de card al
              autorului-cedent sau in numerar la casieria cesionarului.
            </Text>
          </View>
          <View style={styles.section}>
            <Text
              style={{ textAlign: 'left', fontWeight: 600, fontSize: '10px' }}
            >
              6. Autorul-cedent pastreaza toate drepturile de autor asupra
              creatiei stiintifice, avand dreptul de a o publica, sub nume
              propriu, sub pseudonim sau nesemnat. Cesionarul se obliga sa
              utilizeze creatiile prezentate de autorul-cedent numai in
              conformitate cu prevederile prezentului contract. Cesionarul nu
              are dreptul sa transmita altor persoane, cu titlu gratuit sau
              oneros, spre difuzare, reproducere sau in orice alt scop,
              creatiile intelectuale care fac obiectul prezentului contract.
            </Text>
          </View>
          <View style={styles.section}>
            <Text
              style={{ textAlign: 'left', fontWeight: 600, fontSize: '10px' }}
            >
              7. Cesionarul are obligatia de a aduce la cunostinta tertilor,
              subiecte de drept public sau privat in fata carora invoca opiniile
              din creatia intelectuala, numele autorului-cedent.
            </Text>
          </View>
          <View style={styles.section}>
            <Text
              style={{ textAlign: 'left', fontWeight: 600, fontSize: '10px' }}
            >
              8. Autorul-cedent nu foloseste in nici un fel, pentru conceperea,
              realizarea, documentarea, imprimarea, difuzarea etc. creatiei
              intelectuale, baza materiala a cesionarului.
            </Text>
          </View>
          <View style={styles.section}>
            <Text
              style={{ textAlign: 'left', fontWeight: 600, fontSize: '10px' }}
            >
              9. Neindeplinirea sau indeplinirea necorespunzatoare a
              obligatiilor asumate prin prezentul contract atrage raspunderea
              partii in culpa, in afara de cazurile de exonerare prevazute de
              lege. Autorul-cedent nu raspundere in nici un fel pentru faptul ca
              tertii – autotitati, societati comerciale etc. – ar avea o alta
              opinie juridica/tehnica/stiintifica asupra chestiunilor care fac
              obiectul lucrarii stiintifice si ar decide in consecinta.
            </Text>
          </View>
          <View style={styles.section}>
            <Text
              style={{ textAlign: 'left', fontWeight: 600, fontSize: '10px' }}
            >
              10. Prezentul contract de cesiune a dreptului de autor nu
              constituie nici contract de munca, autorul-cedent nedobandind prin
              acest contract calitatea de angajat al cesionarului, nici contract
              civil incheiat direct in temeiul Codului civil, nici contract de
              asistenta juridica specific profesiei de
              avocat/asistenta/expertiza de specialitate.
            </Text>
          </View>
          <View style={styles.section}>
            <Text
              style={{ textAlign: 'left', fontWeight: 600, fontSize: '10px' }}
            >
              11. Prezentul contract se intregeste cu dispozitiile legislatiei
              in vigoare, in special ale: Legii nr. 8/1996 privind dreptul de
              autor si drepturile conexe, republicata; Legii nr. 84/1995, a
              invatamantului, republicata, Codului fiscal, Codului de procedura
              fiscala.
            </Text>
          </View>
          <View style={styles.section}>
            <Text
              style={{ textAlign: 'left', fontWeight: 600, fontSize: '10px' }}
            >
              12. Litigiile ce decurg din interpretarea si executarea
              prezentului contract vor fi solutionate de parti pe cale amiabila.
              Litigiile de orice fel dintre parti, purtand asupra prezentului
              contract, sunt de competenta instantelor judecatoresti, conform
              legislatiei in vigoare
            </Text>
          </View>
          <View style={styles.section}>
            <Text
              style={{ textAlign: 'left', fontWeight: 600, fontSize: '10px' }}
            >
              13. Prezentul contract poate fi reziliat prin acordul partilor sau
              prin denuntare unilaterala de oricare dintre parti, cu un preaviz
              de 15 zile.
            </Text>
          </View>
          <View style={styles.section}>
            <Text
              style={{ textAlign: 'left', fontWeight: 600, fontSize: '10px' }}
            >
              15. Incheiat astazi, {new Date().toLocaleDateString('ro-RO')}, in
              doua exemplare identice, cate unul pentru fiercer parte. Prezentul
              exemplar ramane la cesionar-autor cedent.
            </Text>
          </View>
          <View style={styles.section}>
            <Text
              style={{ textAlign: 'left', fontWeight: 600, fontSize: '10px' }}
            >
              Autorul – cedent declara ca in luna in care primeste remuneratia,
              potrivit art. 5 din prezentul contract, realizeaza venituri din
              salarii /profesii liberale sau activitati autorizate potrivit
              legii, dar nu mai putin de un salariu de baza minim brut pe tara /
              agricultura, silvicultura /indemnizatie de somaj /nu realizeaza
              venituri care se incadreaza intr-una dintre aceste categorii .
            </Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureItem}>Cesionar</Text>
            <Text style={styles.signatureItem}>Autor-cedent</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
export default BasicDocument;
