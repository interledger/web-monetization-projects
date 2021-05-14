.class public abstract La/h/a/a;
.super Landroid/widget/BaseAdapter;
.source ""

# interfaces
.implements Landroid/widget/Filterable;
.implements La/h/a/b$a;


# annotations
.annotation system Ldalvik/annotation/MemberClasses;
    value = {
        La/h/a/a$b;,
        La/h/a/a$a;
    }
.end annotation


# instance fields
.field protected a:Z

.field protected b:Z

.field protected c:Landroid/database/Cursor;

.field protected d:Landroid/content/Context;

.field protected e:I

.field protected f:La/h/a/a$a;

.field protected g:Landroid/database/DataSetObserver;

.field protected h:La/h/a/b;


# direct methods
.method public constructor <init>(Landroid/content/Context;Landroid/database/Cursor;Z)V
    .locals 0

    invoke-direct {p0}, Landroid/widget/BaseAdapter;-><init>()V

    if-eqz p3, :cond_0

    const/4 p3, 0x1

    goto :goto_0

    :cond_0
    const/4 p3, 0x2

    :goto_0
    invoke-virtual {p0, p1, p2, p3}, La/h/a/a;->a(Landroid/content/Context;Landroid/database/Cursor;I)V

    return-void
.end method


# virtual methods
.method public a()Landroid/database/Cursor;
    .locals 1

    iget-object v0, p0, La/h/a/a;->c:Landroid/database/Cursor;

    return-object v0
.end method

.method public abstract a(Landroid/content/Context;Landroid/database/Cursor;Landroid/view/ViewGroup;)Landroid/view/View;
.end method

.method a(Landroid/content/Context;Landroid/database/Cursor;I)V
    .locals 3

    and-int/lit8 v0, p3, 0x1

    const/4 v1, 0x0

    const/4 v2, 0x1

    if-ne v0, v2, :cond_0

    or-int/lit8 p3, p3, 0x2

    iput-boolean v2, p0, La/h/a/a;->b:Z

    goto :goto_0

    :cond_0
    iput-boolean v1, p0, La/h/a/a;->b:Z

    :goto_0
    if-eqz p2, :cond_1

    move v1, v2

    :cond_1
    iput-object p2, p0, La/h/a/a;->c:Landroid/database/Cursor;

    iput-boolean v1, p0, La/h/a/a;->a:Z

    iput-object p1, p0, La/h/a/a;->d:Landroid/content/Context;

    if-eqz v1, :cond_2

    const-string p1, "_id"

    invoke-interface {p2, p1}, Landroid/database/Cursor;->getColumnIndexOrThrow(Ljava/lang/String;)I

    move-result p1

    goto :goto_1

    :cond_2
    const/4 p1, -0x1

    :goto_1
    iput p1, p0, La/h/a/a;->e:I

    const/4 p1, 0x2

    and-int/2addr p3, p1

    if-ne p3, p1, :cond_3

    new-instance p1, La/h/a/a$a;

    invoke-direct {p1, p0}, La/h/a/a$a;-><init>(La/h/a/a;)V

    iput-object p1, p0, La/h/a/a;->f:La/h/a/a$a;

    new-instance p1, La/h/a/a$b;

    invoke-direct {p1, p0}, La/h/a/a$b;-><init>(La/h/a/a;)V

    goto :goto_2

    :cond_3
    const/4 p1, 0x0

    iput-object p1, p0, La/h/a/a;->f:La/h/a/a$a;

    :goto_2
    iput-object p1, p0, La/h/a/a;->g:Landroid/database/DataSetObserver;

    if-eqz v1, :cond_5

    iget-object p1, p0, La/h/a/a;->f:La/h/a/a$a;

    if-eqz p1, :cond_4

    invoke-interface {p2, p1}, Landroid/database/Cursor;->registerContentObserver(Landroid/database/ContentObserver;)V

    :cond_4
    iget-object p1, p0, La/h/a/a;->g:Landroid/database/DataSetObserver;

    if-eqz p1, :cond_5

    invoke-interface {p2, p1}, Landroid/database/Cursor;->registerDataSetObserver(Landroid/database/DataSetObserver;)V

    :cond_5
    return-void
.end method

.method public a(Landroid/database/Cursor;)V
    .locals 0

    invoke-virtual {p0, p1}, La/h/a/a;->b(Landroid/database/Cursor;)Landroid/database/Cursor;

    move-result-object p1

    if-eqz p1, :cond_0

    invoke-interface {p1}, Landroid/database/Cursor;->close()V

    :cond_0
    return-void
.end method

.method public abstract a(Landroid/view/View;Landroid/content/Context;Landroid/database/Cursor;)V
.end method

.method public b(Landroid/database/Cursor;)Landroid/database/Cursor;
    .locals 2

    iget-object v0, p0, La/h/a/a;->c:Landroid/database/Cursor;

    if-ne p1, v0, :cond_0

    const/4 p1, 0x0

    return-object p1

    :cond_0
    if-eqz v0, :cond_2

    iget-object v1, p0, La/h/a/a;->f:La/h/a/a$a;

    if-eqz v1, :cond_1

    invoke-interface {v0, v1}, Landroid/database/Cursor;->unregisterContentObserver(Landroid/database/ContentObserver;)V

    :cond_1
    iget-object v1, p0, La/h/a/a;->g:Landroid/database/DataSetObserver;

    if-eqz v1, :cond_2

    invoke-interface {v0, v1}, Landroid/database/Cursor;->unregisterDataSetObserver(Landroid/database/DataSetObserver;)V

    :cond_2
    iput-object p1, p0, La/h/a/a;->c:Landroid/database/Cursor;

    if-eqz p1, :cond_5

    iget-object v1, p0, La/h/a/a;->f:La/h/a/a$a;

    if-eqz v1, :cond_3

    invoke-interface {p1, v1}, Landroid/database/Cursor;->registerContentObserver(Landroid/database/ContentObserver;)V

    :cond_3
    iget-object v1, p0, La/h/a/a;->g:Landroid/database/DataSetObserver;

    if-eqz v1, :cond_4

    invoke-interface {p1, v1}, Landroid/database/Cursor;->registerDataSetObserver(Landroid/database/DataSetObserver;)V

    :cond_4
    const-string v1, "_id"

    invoke-interface {p1, v1}, Landroid/database/Cursor;->getColumnIndexOrThrow(Ljava/lang/String;)I

    move-result p1

    iput p1, p0, La/h/a/a;->e:I

    const/4 p1, 0x1

    iput-boolean p1, p0, La/h/a/a;->a:Z

    invoke-virtual {p0}, Landroid/widget/BaseAdapter;->notifyDataSetChanged()V

    goto :goto_0

    :cond_5
    const/4 p1, -0x1

    iput p1, p0, La/h/a/a;->e:I

    const/4 p1, 0x0

    iput-boolean p1, p0, La/h/a/a;->a:Z

    invoke-virtual {p0}, Landroid/widget/BaseAdapter;->notifyDataSetInvalidated()V

    :goto_0
    return-object v0
.end method

.method public abstract b(Landroid/content/Context;Landroid/database/Cursor;Landroid/view/ViewGroup;)Landroid/view/View;
.end method

.method protected b()V
    .locals 1

    iget-boolean v0, p0, La/h/a/a;->b:Z

    if-eqz v0, :cond_0

    iget-object v0, p0, La/h/a/a;->c:Landroid/database/Cursor;

    if-eqz v0, :cond_0

    invoke-interface {v0}, Landroid/database/Cursor;->isClosed()Z

    move-result v0

    if-nez v0, :cond_0

    iget-object v0, p0, La/h/a/a;->c:Landroid/database/Cursor;

    invoke-interface {v0}, Landroid/database/Cursor;->requery()Z

    move-result v0

    iput-boolean v0, p0, La/h/a/a;->a:Z

    :cond_0
    return-void
.end method

.method public abstract convertToString(Landroid/database/Cursor;)Ljava/lang/CharSequence;
.end method

.method public getCount()I
    .locals 1

    iget-boolean v0, p0, La/h/a/a;->a:Z

    if-eqz v0, :cond_0

    iget-object v0, p0, La/h/a/a;->c:Landroid/database/Cursor;

    if-eqz v0, :cond_0

    invoke-interface {v0}, Landroid/database/Cursor;->getCount()I

    move-result v0

    return v0

    :cond_0
    const/4 v0, 0x0

    return v0
.end method

.method public getDropDownView(ILandroid/view/View;Landroid/view/ViewGroup;)Landroid/view/View;
    .locals 1

    iget-boolean v0, p0, La/h/a/a;->a:Z

    if-eqz v0, :cond_1

    iget-object v0, p0, La/h/a/a;->c:Landroid/database/Cursor;

    invoke-interface {v0, p1}, Landroid/database/Cursor;->moveToPosition(I)Z

    if-nez p2, :cond_0

    iget-object p1, p0, La/h/a/a;->d:Landroid/content/Context;

    iget-object p2, p0, La/h/a/a;->c:Landroid/database/Cursor;

    invoke-virtual {p0, p1, p2, p3}, La/h/a/a;->a(Landroid/content/Context;Landroid/database/Cursor;Landroid/view/ViewGroup;)Landroid/view/View;

    move-result-object p2

    :cond_0
    iget-object p1, p0, La/h/a/a;->d:Landroid/content/Context;

    iget-object p3, p0, La/h/a/a;->c:Landroid/database/Cursor;

    invoke-virtual {p0, p2, p1, p3}, La/h/a/a;->a(Landroid/view/View;Landroid/content/Context;Landroid/database/Cursor;)V

    return-object p2

    :cond_1
    const/4 p1, 0x0

    return-object p1
.end method

.method public getFilter()Landroid/widget/Filter;
    .locals 1

    iget-object v0, p0, La/h/a/a;->h:La/h/a/b;

    if-nez v0, :cond_0

    new-instance v0, La/h/a/b;

    invoke-direct {v0, p0}, La/h/a/b;-><init>(La/h/a/b$a;)V

    iput-object v0, p0, La/h/a/a;->h:La/h/a/b;

    :cond_0
    iget-object v0, p0, La/h/a/a;->h:La/h/a/b;

    return-object v0
.end method

.method public getItem(I)Ljava/lang/Object;
    .locals 1

    iget-boolean v0, p0, La/h/a/a;->a:Z

    if-eqz v0, :cond_0

    iget-object v0, p0, La/h/a/a;->c:Landroid/database/Cursor;

    if-eqz v0, :cond_0

    invoke-interface {v0, p1}, Landroid/database/Cursor;->moveToPosition(I)Z

    iget-object p1, p0, La/h/a/a;->c:Landroid/database/Cursor;

    return-object p1

    :cond_0
    const/4 p1, 0x0

    return-object p1
.end method

.method public getItemId(I)J
    .locals 3

    iget-boolean v0, p0, La/h/a/a;->a:Z

    const-wide/16 v1, 0x0

    if-eqz v0, :cond_0

    iget-object v0, p0, La/h/a/a;->c:Landroid/database/Cursor;

    if-eqz v0, :cond_0

    invoke-interface {v0, p1}, Landroid/database/Cursor;->moveToPosition(I)Z

    move-result p1

    if-eqz p1, :cond_0

    iget-object p1, p0, La/h/a/a;->c:Landroid/database/Cursor;

    iget v0, p0, La/h/a/a;->e:I

    invoke-interface {p1, v0}, Landroid/database/Cursor;->getLong(I)J

    move-result-wide v0

    return-wide v0

    :cond_0
    return-wide v1
.end method

.method public getView(ILandroid/view/View;Landroid/view/ViewGroup;)Landroid/view/View;
    .locals 1

    iget-boolean v0, p0, La/h/a/a;->a:Z

    if-eqz v0, :cond_2

    iget-object v0, p0, La/h/a/a;->c:Landroid/database/Cursor;

    invoke-interface {v0, p1}, Landroid/database/Cursor;->moveToPosition(I)Z

    move-result v0

    if-eqz v0, :cond_1

    if-nez p2, :cond_0

    iget-object p1, p0, La/h/a/a;->d:Landroid/content/Context;

    iget-object p2, p0, La/h/a/a;->c:Landroid/database/Cursor;

    invoke-virtual {p0, p1, p2, p3}, La/h/a/a;->b(Landroid/content/Context;Landroid/database/Cursor;Landroid/view/ViewGroup;)Landroid/view/View;

    move-result-object p2

    :cond_0
    iget-object p1, p0, La/h/a/a;->d:Landroid/content/Context;

    iget-object p3, p0, La/h/a/a;->c:Landroid/database/Cursor;

    invoke-virtual {p0, p2, p1, p3}, La/h/a/a;->a(Landroid/view/View;Landroid/content/Context;Landroid/database/Cursor;)V

    return-object p2

    :cond_1
    new-instance p2, Ljava/lang/IllegalStateException;

    new-instance p3, Ljava/lang/StringBuilder;

    invoke-direct {p3}, Ljava/lang/StringBuilder;-><init>()V

    const-string v0, "couldn\'t move cursor to position "

    invoke-virtual {p3, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {p3, p1}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    invoke-virtual {p3}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p1

    invoke-direct {p2, p1}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    throw p2

    :cond_2
    new-instance p1, Ljava/lang/IllegalStateException;

    const-string p2, "this should only be called when the cursor is valid"

    invoke-direct {p1, p2}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    throw p1
.end method
