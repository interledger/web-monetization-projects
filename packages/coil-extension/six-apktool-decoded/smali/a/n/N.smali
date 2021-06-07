.class La/n/N;
.super Ljava/lang/Object;
.source ""


# instance fields
.field final a:La/d/b;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "La/d/b<",
            "Landroid/view/View;",
            "La/n/M;",
            ">;"
        }
    .end annotation
.end field

.field final b:Landroid/util/SparseArray;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Landroid/util/SparseArray<",
            "Landroid/view/View;",
            ">;"
        }
    .end annotation
.end field

.field final c:La/d/f;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "La/d/f<",
            "Landroid/view/View;",
            ">;"
        }
    .end annotation
.end field

.field final d:La/d/b;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "La/d/b<",
            "Ljava/lang/String;",
            "Landroid/view/View;",
            ">;"
        }
    .end annotation
.end field


# direct methods
.method constructor <init>()V
    .locals 1

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    new-instance v0, La/d/b;

    invoke-direct {v0}, La/d/b;-><init>()V

    iput-object v0, p0, La/n/N;->a:La/d/b;

    new-instance v0, Landroid/util/SparseArray;

    invoke-direct {v0}, Landroid/util/SparseArray;-><init>()V

    iput-object v0, p0, La/n/N;->b:Landroid/util/SparseArray;

    new-instance v0, La/d/f;

    invoke-direct {v0}, La/d/f;-><init>()V

    iput-object v0, p0, La/n/N;->c:La/d/f;

    new-instance v0, La/d/b;

    invoke-direct {v0}, La/d/b;-><init>()V

    iput-object v0, p0, La/n/N;->d:La/d/b;

    return-void
.end method
