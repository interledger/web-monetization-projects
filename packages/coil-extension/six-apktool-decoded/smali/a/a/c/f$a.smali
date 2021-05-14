.class public La/a/c/f$a;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements La/a/c/b$a;


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = La/a/c/f;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x9
    name = "a"
.end annotation


# instance fields
.field final a:Landroid/view/ActionMode$Callback;

.field final b:Landroid/content/Context;

.field final c:Ljava/util/ArrayList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/ArrayList<",
            "La/a/c/f;",
            ">;"
        }
    .end annotation
.end field

.field final d:La/d/i;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "La/d/i<",
            "Landroid/view/Menu;",
            "Landroid/view/Menu;",
            ">;"
        }
    .end annotation
.end field


# direct methods
.method public constructor <init>(Landroid/content/Context;Landroid/view/ActionMode$Callback;)V
    .locals 0

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    iput-object p1, p0, La/a/c/f$a;->b:Landroid/content/Context;

    iput-object p2, p0, La/a/c/f$a;->a:Landroid/view/ActionMode$Callback;

    new-instance p1, Ljava/util/ArrayList;

    invoke-direct {p1}, Ljava/util/ArrayList;-><init>()V

    iput-object p1, p0, La/a/c/f$a;->c:Ljava/util/ArrayList;

    new-instance p1, La/d/i;

    invoke-direct {p1}, La/d/i;-><init>()V

    iput-object p1, p0, La/a/c/f$a;->d:La/d/i;

    return-void
.end method

.method private a(Landroid/view/Menu;)Landroid/view/Menu;
    .locals 2

    iget-object v0, p0, La/a/c/f$a;->d:La/d/i;

    invoke-virtual {v0, p1}, La/d/i;->get(Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object v0

    check-cast v0, Landroid/view/Menu;

    if-nez v0, :cond_0

    iget-object v0, p0, La/a/c/f$a;->b:Landroid/content/Context;

    move-object v1, p1

    check-cast v1, La/g/c/a/a;

    invoke-static {v0, v1}, Landroidx/appcompat/view/menu/x;->a(Landroid/content/Context;La/g/c/a/a;)Landroid/view/Menu;

    move-result-object v0

    iget-object v1, p0, La/a/c/f$a;->d:La/d/i;

    invoke-virtual {v1, p1, v0}, La/d/i;->put(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;

    :cond_0
    return-object v0
.end method


# virtual methods
.method public a(La/a/c/b;)V
    .locals 1

    iget-object v0, p0, La/a/c/f$a;->a:Landroid/view/ActionMode$Callback;

    invoke-virtual {p0, p1}, La/a/c/f$a;->b(La/a/c/b;)Landroid/view/ActionMode;

    move-result-object p1

    invoke-interface {v0, p1}, Landroid/view/ActionMode$Callback;->onDestroyActionMode(Landroid/view/ActionMode;)V

    return-void
.end method

.method public a(La/a/c/b;Landroid/view/Menu;)Z
    .locals 1

    iget-object v0, p0, La/a/c/f$a;->a:Landroid/view/ActionMode$Callback;

    invoke-virtual {p0, p1}, La/a/c/f$a;->b(La/a/c/b;)Landroid/view/ActionMode;

    move-result-object p1

    invoke-direct {p0, p2}, La/a/c/f$a;->a(Landroid/view/Menu;)Landroid/view/Menu;

    move-result-object p2

    invoke-interface {v0, p1, p2}, Landroid/view/ActionMode$Callback;->onCreateActionMode(Landroid/view/ActionMode;Landroid/view/Menu;)Z

    move-result p1

    return p1
.end method

.method public a(La/a/c/b;Landroid/view/MenuItem;)Z
    .locals 2

    iget-object v0, p0, La/a/c/f$a;->a:Landroid/view/ActionMode$Callback;

    invoke-virtual {p0, p1}, La/a/c/f$a;->b(La/a/c/b;)Landroid/view/ActionMode;

    move-result-object p1

    iget-object v1, p0, La/a/c/f$a;->b:Landroid/content/Context;

    check-cast p2, La/g/c/a/b;

    invoke-static {v1, p2}, Landroidx/appcompat/view/menu/x;->a(Landroid/content/Context;La/g/c/a/b;)Landroid/view/MenuItem;

    move-result-object p2

    invoke-interface {v0, p1, p2}, Landroid/view/ActionMode$Callback;->onActionItemClicked(Landroid/view/ActionMode;Landroid/view/MenuItem;)Z

    move-result p1

    return p1
.end method

.method public b(La/a/c/b;)Landroid/view/ActionMode;
    .locals 4

    iget-object v0, p0, La/a/c/f$a;->c:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    const/4 v1, 0x0

    :goto_0
    if-ge v1, v0, :cond_1

    iget-object v2, p0, La/a/c/f$a;->c:Ljava/util/ArrayList;

    invoke-virtual {v2, v1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, La/a/c/f;

    if-eqz v2, :cond_0

    iget-object v3, v2, La/a/c/f;->b:La/a/c/b;

    if-ne v3, p1, :cond_0

    return-object v2

    :cond_0
    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_1
    new-instance v0, La/a/c/f;

    iget-object v1, p0, La/a/c/f$a;->b:Landroid/content/Context;

    invoke-direct {v0, v1, p1}, La/a/c/f;-><init>(Landroid/content/Context;La/a/c/b;)V

    iget-object p1, p0, La/a/c/f$a;->c:Ljava/util/ArrayList;

    invoke-virtual {p1, v0}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    return-object v0
.end method

.method public b(La/a/c/b;Landroid/view/Menu;)Z
    .locals 1

    iget-object v0, p0, La/a/c/f$a;->a:Landroid/view/ActionMode$Callback;

    invoke-virtual {p0, p1}, La/a/c/f$a;->b(La/a/c/b;)Landroid/view/ActionMode;

    move-result-object p1

    invoke-direct {p0, p2}, La/a/c/f$a;->a(Landroid/view/Menu;)Landroid/view/Menu;

    move-result-object p2

    invoke-interface {v0, p1, p2}, Landroid/view/ActionMode$Callback;->onPrepareActionMode(Landroid/view/ActionMode;Landroid/view/Menu;)Z

    move-result p1

    return p1
.end method
