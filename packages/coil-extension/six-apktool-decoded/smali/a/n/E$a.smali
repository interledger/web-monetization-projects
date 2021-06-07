.class La/n/E$a;
.super Ljava/lang/Object;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = La/n/E;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0xa
    name = "a"
.end annotation


# instance fields
.field a:Landroid/view/View;

.field b:Ljava/lang/String;

.field c:La/n/M;

.field d:La/n/ka;

.field e:La/n/E;


# direct methods
.method constructor <init>(Landroid/view/View;Ljava/lang/String;La/n/E;La/n/ka;La/n/M;)V
    .locals 0

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    iput-object p1, p0, La/n/E$a;->a:Landroid/view/View;

    iput-object p2, p0, La/n/E$a;->b:Ljava/lang/String;

    iput-object p5, p0, La/n/E$a;->c:La/n/M;

    iput-object p4, p0, La/n/E$a;->d:La/n/ka;

    iput-object p3, p0, La/n/E$a;->e:La/n/E;

    return-void
.end method
